import { Box, Button, Checkbox, FormControlLabel, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import type { ConfirmationToken, StripeAddressElementChangeEvent, StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useBasket } from "../../app/util/hooks/useBasket";
import { currencyFormat } from "../../app/util/util";
import { useFetchAddressQuery, useUpdateUserAddressMutation } from "../account/accountApi";
import Review from "./Review";

const steps = ["Address", "Payment", "Review"]

export default function CheckoutStepper() {
  const { basket, clearBasket, total } = useBasket();
  const { data, isLoading } = useFetchAddressQuery();
  const [updateAddress] = useUpdateUserAddressMutation();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isSaveAddressChecked, setIsSaveAddressChecked] = useState(false);
  const [isAddressComplete, setIsAddressComplete] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [confirmationToken, setConfirmationToken] = useState<ConfirmationToken | null>(null);


  let name, restAddress;
  if (data) {
    ({ name, ...restAddress } = data);
  }

  const getStripeAddress = async () => {
    const addressElement = elements?.getElement("address");
    if (!addressElement) return null;
    const { value: { name, address } } = await addressElement.getValue();

    if (name && address) return { ...address, name };

    return null;
  }

  const confirmPayment = async () => {
    setIsSubmitting(true);
    try {
      if (!confirmationToken || !basket?.clientSecret)
        throw new Error("Unable to process payment.");

      const paymentResult = await stripe?.confirmPayment({
        clientSecret: basket.clientSecret,
        redirect: "if_required",
        confirmParams: {
          confirmation_token: confirmationToken.id
        }
      });

      if (paymentResult?.paymentIntent?.status === "succeeded") {
        navigate("/checkout/success");
        clearBasket();
      } else if (paymentResult?.error) {
        throw new Error(paymentResult.error.message);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setActiveStep(step => step - 1);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleNext = async () => {
    if (activeStep === 0 && isSaveAddressChecked && elements) {
      const address = await getStripeAddress();
      if (address) await updateAddress(address);
    }

    if (activeStep === 1) {
      if (!elements || !stripe) return;
      const result = await elements.submit();
      if (result.error) return toast.error(result.error.message);

      const stripeResult = await stripe.createConfirmationToken({ elements });
      if (stripeResult.error) return toast.error(stripeResult.error.message);
      setConfirmationToken(stripeResult.confirmationToken);
    }

    if (activeStep === 2) {
      await confirmPayment();
    }

    if (!isFinalStep()) setActiveStep(step => step + 1);
  }

  const handleBack = () => {
    setActiveStep(step => step - 1);
  }

  const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    setIsAddressComplete(event.complete);
  }

  const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    setIsPaymentComplete(event.complete);
  }

  const isFinalStep = (): boolean => {
    return activeStep === steps.length - 1;
  }

  if (isLoading) return <LoadingComponent message="Loading checkout..." />;

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
          <AddressElement
            options={{
              mode: "shipping",
              defaultValues: {
                name: name,
                address: restAddress,
              }
            }}
            onChange={handleAddressChange}
          />
          <FormControlLabel
            control={<Checkbox
              checked={isSaveAddressChecked}
              onChange={event => setIsSaveAddressChecked(event.target.checked)}
            />}
            label="Save as default address"
            sx={{ display: "flex", justifyContent: "end" }}
          />
        </Box>
        <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
          <PaymentElement
            onChange={handlePaymentChange}
            options={{
              wallets: {
                applePay: "never",
                googlePay: "never",
                link: "never"
              }
            }}
          />
        </Box>
        <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
          <Review confirmationToken={confirmationToken} />
        </Box>
      </Box>

      <Box display="flex" paddingTop={2} justifyContent="space-between">
        <Button onClick={handleBack}>Back</Button>
        <Button
          onClick={handleNext}
          variant={isFinalStep() ? "contained" : "text"}
          loading={isSubmitting}
          disabled={
            (activeStep === 0 && !isAddressComplete) ||
            (activeStep === 1 && !isPaymentComplete) 
          }
        >
          {isFinalStep() ? `Pay ${currencyFormat(total)}` : "Next"}
        </Button>
      </Box>
    </Paper>
  );
}

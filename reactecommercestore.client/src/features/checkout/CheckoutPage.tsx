import { Grid } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { useEffect, useMemo, useRef } from "react";
import OrderSummary from "../../app/components/OrderSummary";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppSelector } from "../../app/store/store";
import { useFetchBasketQuery } from "../basket/basketApi";
import CheckoutStepper from "./CheckoutStepper";
import { useCreatePaymentIntentMutation } from "./checkoutApi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function CheckoutPage() {
  const { data: basket } = useFetchBasketQuery();
  const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation();
  const { darkMode } = useAppSelector(state => state.ui);
  const created = useRef(false);

  useEffect(() => {
    if (!created.current) createPaymentIntent();
    created.current = true;
  }, [createPaymentIntent]);

  const options: StripeElementsOptions | undefined = useMemo(() => {
    if (!basket?.clientSecret) return undefined;
    return {
      clientSecret: basket?.clientSecret,
      appearance: {
        labels: "floating",
        theme: darkMode ? "night" : "stripe"
      }
    }
  }, [basket?.clientSecret, darkMode]);

  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        {!stripePromise || !options || isLoading ? (
          <LoadingComponent message="Loading checkout..." />
        ) : (
            <Elements stripe={stripePromise} options={options}>
            <CheckoutStepper />
          </Elements>
        )}
      </Grid>
      <Grid size={4}>
        <OrderSummary />
      </Grid>
    </Grid>
  );
}

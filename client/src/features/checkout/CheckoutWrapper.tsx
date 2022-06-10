import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe(
  "pk_test_51L87t5C84j8mI8AlwZvPyFZDzIAmRAkT3IhOsjpE9L8MAqfZNFB9i25iarPkMJ1GF6Ee7z9PUgPdG6iB3wt6y1uA00ddYf0b8Y"
);

export default function CheckoutWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}

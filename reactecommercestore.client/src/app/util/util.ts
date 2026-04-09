import type { PaymentSummary, ShippingAddress } from "../models/order";

/**
 * Converts given amount in long form (64 bit integer) to standard US currency format.
 * 
 * Example: currencyFormat(12345);  // returns "$123.45"
 * 
 * @param {number} amount The amount to be formatted Example: `12345`
 * @returns {string} The resulting formatted string. Example: `$123.45`
 */
export function currencyFormat(amount: number): string {
  return "$" + (amount / 100).toFixed(2);
}

/**
 * Removes null, undefined, and 0-length properties from the given object.
 * 
 * Example: 
 * filterEmptyValues({
 *  make: "Ford", 
 *  model: "Mustang", 
 *  year: null, 
 *  originalOwner: undefined, 
 *  currentOwner: ""
 * });
 * 
 * returns
 * { make: "Ford", model: "Mustang" }
 * 
 * @param {object} values The object to be filtered
 */
export function filterEmptyValues(values: object) {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([, value]) => value != null && value.length !== 0
    )
  );
}

export function formatOrderAddressString(address: ShippingAddress) {
  return `${address?.name}, ${address?.line1}, ${address?.city}, ${address?.state}, ${address?.postal_code}, ${address?.country}`;
}

export function formatOrderPaymentString(card: PaymentSummary) {
  return `${card?.brand?.toUpperCase()}, **** **** **** ${card?.last4}, Exp: ${card?.exp_month}/${card?.exp_year}`;
}
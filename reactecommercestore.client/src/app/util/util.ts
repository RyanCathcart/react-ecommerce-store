export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}


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
import { useClearBasketMutation, useFetchBasketQuery } from "../../../features/basket/basketApi";
import type { BasketItem } from "../../models/basket";

export const useBasket = () => {
  const { data: basket } = useFetchBasketQuery();
  const [clearBasket] = useClearBasketMutation();
  const subtotal = basket?.items.reduce((sum: number, item: BasketItem) => sum + (item.price * item.quantity), 0) ?? 0;
  const deliveryFee = subtotal > 10000 ? 0 : 500;
  const total = subtotal + deliveryFee;

  return { basket, clearBasket, subtotal, deliveryFee, total };
}
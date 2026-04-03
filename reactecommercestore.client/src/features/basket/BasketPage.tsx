import { Grid, Typography } from "@mui/material";
import { useFetchBasketQuery } from "./basketApi";
import LoadingComponent from "../../app/layout/LoadingComponent";
import BasketItemListing from "./BasketItemListing";
import OrderSummary from "../../app/components/OrderSummary";

export default function BasketPage() {
  const { data: basket, isLoading } = useFetchBasketQuery();

  if (isLoading) return <LoadingComponent message="Loading basket..." />

  if (!basket || basket.items.length === 0)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        {basket.items.map((item) => (
          <BasketItemListing item={item} key={item.productId } />
        ))}
      </Grid>
      <Grid size={4}>
        <OrderSummary />
      </Grid>
    </Grid>
  );
}

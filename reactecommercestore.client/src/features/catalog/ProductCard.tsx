import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import type { Product } from "../../app/models/product";
import { currencyFormat } from "../../app/util/util";
import { useAddBasketItemMutation } from "../basket/basketApi";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [addBasketItem, { isLoading }] = useAddBasketItemMutation();

  return (
    <Card
      elevation={3}
      sx={{
        width: 280,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        sx={{ height: 240, backgroundSize: "cover" }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          sx={{ textTransform: "uppercase" }}
          variant="subtitle2">
          {product.name}
        </Typography>
        <Typography
          sx={{ color: "secondary.main" }}
          variant="h6">
          {currencyFormat(product.price)}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ justifyContent: 'space-between' }}>
        <Button
          loading={isLoading}
          onClick={() => addBasketItem({
            product,
            quantity: 1
          })}
        >Add to cart</Button>
        <Button component={Link} to={`/catalog/${product.id}`}>View</Button>
      </CardActions>
    </Card>
  );
}

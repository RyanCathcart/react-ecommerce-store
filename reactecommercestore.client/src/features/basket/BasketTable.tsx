import { Remove, Add, Delete } from "@mui/icons-material";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
} from "@mui/material";
import type { BasketItem } from "../../app/models/basket";
import { useAppSelector, useAppDispatch } from "../../app/store/store";
import { currencyFormat } from "../../app/util/util";

interface BasketTableProps {
  items: BasketItem[];
  isBasket?: boolean;
}

export default function BasketTable({
  items,
  isBasket = true,
}: BasketTableProps) {
  //const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            {isBasket && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  <img
                    src={item.pictureUrl}
                    alt={item.name}
                    style={{ height: 50, marginRight: 20 }}
                  />
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price)}</TableCell>
              <TableCell align="center">
                {isBasket && (
                  <Button
                    loading={
                      status === "pendingRemoveItem" + item.productId + "rem"
                    }

                    color="error"
                  >
                    <Remove />
                  </Button>
                )}
                {item.quantity}
                {isBasket && (
                  <Button
                    loading={status === "pendingAddItem" + item.productId}

                    color="secondary"
                  >
                    <Add />
                  </Button>
                )}
              </TableCell>
              <TableCell align="right">
                {currencyFormat(item.price * item.quantity)}
              </TableCell>
              {isBasket && (
                <TableCell align="right">
                  <Button
                    loading={
                      status === "pendingRemoveItem" + item.productId + "del"
                    }

                    color="error"
                  >
                    <Delete />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

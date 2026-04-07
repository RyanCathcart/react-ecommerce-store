import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { ConfirmationToken } from "@stripe/stripe-js";
import { useBasket } from "../../app/util/hooks/useBasket";
import { currencyFormat } from "../../app/util/util";

interface Props {
  confirmationToken: ConfirmationToken | null;
}

export default function Review({ confirmationToken }: Props) {
  const { basket } = useBasket();

  const addressString = () => {
    if (!confirmationToken?.shipping) return "";
    const { name, address } = confirmationToken.shipping;

    return `${name}, ${address?.line1}, ${address?.city}, ${address?.state}, ${address?.postal_code}, ${address?.country}`;
  }

  const paymentString = () => {
    if (!confirmationToken?.payment_method_preview.card) return "";
    const { card } = confirmationToken.payment_method_preview;

    return `${card.brand.toUpperCase()}, **** **** **** ${card.last4}, Exp: ${card.exp_month}/${card.exp_year}`;
  }

  return (
    <>
      <Box mt={4} width="100%">
        <Typography variant="h6" fontWeight="bold">
          Billing and delivery information
        </Typography>
        <dl>
          <Typography component="dt" fontWeight="medium">
            Shipping address
          </Typography>
          <Typography component="dd" mt={1} color="textSecondary">
            {addressString()}
          </Typography>

          <Typography component="dt" fontWeight="medium">
            Payment details
          </Typography>
          <Typography component="dd" mt={1} color="textSecondary">
            {paymentString()}
          </Typography>
        </dl>
      </Box>
      <Box mt={6} mx="auto">
        <Divider />
        <TableContainer>
          <Table>
            <TableBody>
              {basket?.items.map((item) => (
                <TableRow key={item.productId} sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                  <TableCell sx={{ px: 4 }}>
                    <Box display="flex" gap={3} alignItems="center">
                      <img src={item.pictureUrl} alt={item.name} style={{ width: 40, height: 40 }} />
                      <Typography>
                        {item.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ p: 4 }}>
                    x {item.quantity}
                  </TableCell>
                  <TableCell align="right" sx={{ p: 4 }}>
                    {currencyFormat(item.price)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

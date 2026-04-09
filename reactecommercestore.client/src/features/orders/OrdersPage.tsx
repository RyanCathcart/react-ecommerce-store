import { Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { currencyFormat } from "../../app/util/util";
import { useFetchOrdersQuery } from "./orderApi";

export default function OrdersPage() {
  const { data: orders, isLoading } = useFetchOrdersQuery();
  const navigate = useNavigate();

  if (isLoading) return <LoadingComponent message="Loading your orders..." />

  if (!orders) return <Typography variant="h5">No orders available</Typography>

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" gutterBottom>
        My orders
      </Typography>
      <Paper sx={{ borderRadius: 3} }>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Order</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow
                key={order.id}
                hover
                onClick={() => navigate(`/orders/${order.id}`)}
                style={{ cursor: "pointer" }}
              >
                <TableCell align="center"># {order.id}</TableCell>
                <TableCell>{format(order.orderDate, "dd MMM yyyy")}</TableCell>
                <TableCell>{currencyFormat(order.total)}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  )
}
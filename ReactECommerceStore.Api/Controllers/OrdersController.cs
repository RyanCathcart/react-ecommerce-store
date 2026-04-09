using Microsoft.AspNetCore.Mvc;
using ReactECommerceStore.Api.DTOs;
using ReactECommerceStore.Api.Entities.OrderAggregate;
using ReactECommerceStore.Api.Extensions;

namespace ReactECommerceStore.Api.Controllers;

[Authorize]
public class OrdersController(StoreContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetOrders()
    {
        var orders = await context.Orders
            .ProjectToDto()
            .Where(o => o.BuyerEmail == User.GetUsername())
            .ToListAsync();

        return orders;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderDto>> GetOrderDetails(int id)
    {
        var order = await context.Orders
            .ProjectToDto()
            .Where(o => o.BuyerEmail == User.GetUsername() && o.Id == id)
            .FirstOrDefaultAsync();

        if (order == null) return NotFound();

        return order;
    }

    [HttpPost]
    public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto)
    {
        var basket = await context.Baskets
            .GetBasketWithItems(Request.Cookies["basketId"]);

        if (basket == null || basket.Items.Count == 0 || string.IsNullOrEmpty(basket.PaymentIntentId)) 
            return BadRequest(new ProblemDetails { Title = "Basket is empty or not found." });

        var items = CreateOrderItems(basket.Items);
        
        if (items == null) 
            return BadRequest(new ProblemDetails { Title = "One or more items in the basket are out of stock." });

        var subtotal = items.Sum(item => item.Price * item.Quantity);
        var deliveryFee = CalculateDeliveryFee(subtotal);

        var order = new Order
        {
            BuyerEmail = User.GetUsername(),
            ShippingAddress = orderDto.ShippingAddress,
            OrderItems = items,
            Subtotal = subtotal,
            DeliveryFee = deliveryFee,
            PaymentIntentId = basket.PaymentIntentId,
            PaymentSummary = orderDto.PaymentSummary
        };

        context.Orders.Add(order);

        context.Baskets.Remove(basket);
        Response.Cookies.Delete("basketId");

        var result = await context.SaveChangesAsync() > 0;

        if (!result) return BadRequest(new ProblemDetails { Title = "Problem creating order" });


        return CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id }, order.MapToDto());

    }

    private static long CalculateDeliveryFee(long subtotal)
    {
        return subtotal > 10000 ? 0 : 500;
    }

    private static List<OrderItem>? CreateOrderItems(List<BasketItem> items)
    {
        var orderItems = new List<OrderItem>();

        foreach (var item in items)
        {
            if (item.Product.QuantityInStock < item.Quantity)
                return null;

            var orderItem = new OrderItem
            {
                ItemOrdered = new ProductItemOrdered
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    PictureUrl = item.Product.PictureUrl
                },
                Price = item.Product.Price,
                Quantity = item.Quantity
            };

            orderItems.Add(orderItem);

            item.Product.QuantityInStock -= item.Quantity;
        }

        return orderItems;
    }
}

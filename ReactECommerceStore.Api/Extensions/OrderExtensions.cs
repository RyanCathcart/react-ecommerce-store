using ReactECommerceStore.Api.DTOs;
using ReactECommerceStore.Api.Entities.OrderAggregate;

namespace ReactECommerceStore.Api.Extensions;

public static class OrderExtensions
{
    public static IQueryable<OrderDto> ProjectToDto(this IQueryable<Order> query)
    {
        return query.Select(order => order.MapToDto()).AsNoTracking();
    }

    public static OrderDto MapToDto(this Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            BuyerEmail = order.BuyerEmail,
            ShippingAddress = order.ShippingAddress,
            OrderDate = order.OrderDate,
            OrderItems = [.. order.OrderItems.Select(item => new OrderItemDto
            {
                ProductId = item.ItemOrdered.ProductId,
                Name = item.ItemOrdered.Name,
                PictureUrl = item.ItemOrdered.PictureUrl,
                Price = item.Price,
                Quantity = item.Quantity
            })],
            Subtotal = order.Subtotal,
            DeliveryFee = order.DeliveryFee,
            Discount = order.Discount,
            Total = order.GetTotal(),
            OrderStatus = order.OrderStatus.ToString(),
            PaymentSummary = order.PaymentSummary
        };
    }
}

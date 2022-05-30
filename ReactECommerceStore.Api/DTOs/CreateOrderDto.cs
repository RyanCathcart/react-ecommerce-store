using ReactECommerceStore.Api.Entities.OrderAggregate;

namespace ReactECommerceStore.Api.DTOs;

public class CreateOrderDto
{
    public bool SaveAddress { get; set; }
    public ShippingAddress ShippingAddress { get; set; }
}

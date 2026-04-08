using ReactECommerceStore.Api.Entities.OrderAggregate;

namespace ReactECommerceStore.Api.DTOs;

public class CreateOrderDto
{
    public required ShippingAddress ShippingAddress { get; set; }
    public required PaymentSummary PaymentSummary { get; set; }
}

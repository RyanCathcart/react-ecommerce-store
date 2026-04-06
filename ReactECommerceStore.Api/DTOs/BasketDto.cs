namespace ReactECommerceStore.Api.DTOs;

public class BasketDto
{
    public required string Id { get; set; }
    public List<BasketItemDto> Items { get; set; } = [];
    public string? ClientSecret { get; set; }
    public string? PaymentIntentId { get; set; }
}

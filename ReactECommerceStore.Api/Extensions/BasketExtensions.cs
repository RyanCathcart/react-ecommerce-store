using ReactECommerceStore.Api.DTOs;

namespace ReactECommerceStore.Api.Extensions;

public static class BasketExtensions
{
    public static BasketDto MapToDto(this Basket basket)
    {
        return new BasketDto
        {
            Id = basket.BasketId,
            Items = [.. basket.Items.Select(item => new BasketItemDto
            {
                ProductId = item.ProductId,
                Name = item.Product.Name,
                Price = item.Product.Price,
                PictureUrl = item.Product.PictureUrl,
                Type = item.Product.Type,
                Brand = item.Product.Brand,
                Quantity = item.Quantity
            })],
            ClientSecret = basket.ClientSecret,
            PaymentIntentId = basket.PaymentIntentId
        };
    }

    public static async Task<Basket> GetBasketWithItems(this IQueryable<Basket> query, string? basketId)
    {
        return await query
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(b => b.BasketId == basketId) 
            ?? throw new Exception("Cannot get basket");
    }
}

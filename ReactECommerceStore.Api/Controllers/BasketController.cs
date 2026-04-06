using Microsoft.AspNetCore.Mvc;
using ReactECommerceStore.Api.DTOs;
using ReactECommerceStore.Api.Extensions;

namespace ReactECommerceStore.Api.Controllers;

public class BasketController(StoreContext context) : BaseApiController
{
    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();

        if (basket == null) return NoContent();
        return basket.MapToDto();
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket();

        if (basket == null) basket = CreateBasket();

        var product = await context.Products.FindAsync(productId);

        if (product == null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });

        basket.AddItem(product, quantity);

        var result = await context.SaveChangesAsync() > 0;

        if (result) return CreatedAtRoute(nameof(GetBasket), basket.MapToDto());

        return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        // get basket
        var basket = await RetrieveBasket();

        if (basket == null) return NotFound();

        // remove item or reduce quantity
        basket.RemoveItem(productId, quantity);
        // save changes
        var result = await context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest(new ProblemDetails { Title = "Problem removing item from basket" });
    }

    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
    }

    private Basket CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();

        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.UtcNow.AddDays(30)
        };

        Response.Cookies.Append("basketId", basketId, cookieOptions);

        var basket = new Basket { BasketId = basketId };
        context.Baskets.Add(basket);
        return basket;
    }
}

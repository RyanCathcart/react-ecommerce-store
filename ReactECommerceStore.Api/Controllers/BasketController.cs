using Microsoft.AspNetCore.Mvc;
using ReactECommerceStore.Api.DTOs;
using ReactECommerceStore.Api.Extensions;

namespace ReactECommerceStore.Api.Controllers;

public class BasketController : BaseApiController
{
    private readonly StoreContext _context;
    public BasketController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket(GetBuyerId());

        if (basket == null) return NotFound();
        return basket.MapBasketToDto();
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket(GetBuyerId());

        if (basket == null) basket = CreateBasket();

        var product = await _context.Products.FindAsync(productId);

        if (product == null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });

        basket.AddItem(product, quantity);

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

        return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        // get basket
        var basket = await RetrieveBasket(GetBuyerId());

        if (basket == null) return NotFound();

        // remove item or reduce quantity
        basket.RemoveItem(productId, quantity);
        // save changes
        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest(new ProblemDetails { Title = "Problem removing item from basket" });
    }

    private async Task<Basket> RetrieveBasket(string buyerId)
    {
        if (string.IsNullOrEmpty(buyerId))
        {
            Response.Cookies.Delete("buyerId");
            return null;
        }

        return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
    }

    private string GetBuyerId()
    {
        return User.Identity?.Name ?? Request.Cookies["buyerId"];
    }

    private Basket CreateBasket()
    {
        var buyerId = User.Identity?.Name;
        if (string.IsNullOrEmpty(buyerId))
        {
            buyerId= Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.UtcNow.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
        }
        
        var basket = new Basket { BuyerId = buyerId };
        _context.Baskets.Add(basket);
        return basket;
    }
}

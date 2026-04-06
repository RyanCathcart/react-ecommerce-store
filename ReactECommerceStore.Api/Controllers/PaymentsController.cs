using Microsoft.AspNetCore.Mvc;
using ReactECommerceStore.Api.DTOs;
using ReactECommerceStore.Api.Entities.OrderAggregate;
using ReactECommerceStore.Api.Extensions;
using Stripe;

namespace ReactECommerceStore.Api.Controllers;

public class PaymentsController(PaymentService paymentService, StoreContext context, IConfiguration config) : BaseApiController
{

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
    {
        var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);

        if (basket == null) return BadRequest(new ProblemDetails { Title = "Problem with the basket" });

        var intent = await paymentService.CreateOrUpdatePaymentIntent(basket);

        if (intent == null) return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" });

        basket.PaymentIntentId ??= intent.Id;
        basket.ClientSecret ??= intent.ClientSecret;

        if (context.ChangeTracker.HasChanges())
        {
            var result = await context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating basket with payment intent" });
        }

        return basket.MapToDto();
    }

    [HttpPost("webhook")]
    public async Task<ActionResult> StripeWebhook()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

        var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"],
            config["StripeSettings:WhSecret"]);

        var charge = (Charge)stripeEvent.Data.Object;

        var order = await context.Orders.FirstOrDefaultAsync(x =>
            x.PaymentIntentId == charge.PaymentIntentId);

        if (charge.Status == "succeeded") order?.OrderStatus = OrderStatus.PaymentRecieved;

        await context.SaveChangesAsync();

        return new EmptyResult();
    }
}

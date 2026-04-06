using Stripe;

namespace ReactECommerceStore.Api.Services;

public class PaymentService()
{
    public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
    {
        StripeConfiguration.ApiKey = Environment.GetEnvironmentVariable("StripeSettings__SecretKey");

        var paymentIntentService = new PaymentIntentService();

        var intent = new PaymentIntent();
        var subtotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);
        var deliveryFee = subtotal > 10000 ? 0 : 500;

        if (string.IsNullOrEmpty(basket.PaymentIntentId))
        {
            var createOptions = new PaymentIntentCreateOptions
            {
                Amount = subtotal + deliveryFee,
                Currency = "usd",
                PaymentMethodTypes = ["card"]
            };
            intent = await paymentIntentService.CreateAsync(createOptions);
        }
        else
        {
            var updateOptions = new PaymentIntentUpdateOptions
            {
                Amount = subtotal + deliveryFee,
            };
            await paymentIntentService.UpdateAsync(basket.PaymentIntentId, updateOptions);
        }

        return intent;
    }
}

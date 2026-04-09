using System.Text.Json.Serialization;

namespace ReactECommerceStore.Api.Entities.OrderAggregate;

[Owned]
public class PaymentSummary
{
    public int Last4 { get; set; }
    public required string Brand { get; set; }
    [JsonPropertyName("exp_month")]
    public int ExpMonth { get; set; }
    [JsonPropertyName("exp_year")]
    public int ExpYear { get; set; }
}

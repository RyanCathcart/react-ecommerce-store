using System.Text.Json.Serialization;

namespace ReactECommerceStore.Api.Entities.OrderAggregate;

[Owned]
public class ShippingAddress
{
    public required string Name { get; set; }
    [JsonPropertyName("line1")]
    public required string Address1 { get; set; }
    [JsonPropertyName("line2")]
    public string? Address2 { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }
    [JsonPropertyName("postal_code")]
    public required string Zip { get; set; }
    public required string Country { get; set; }
}

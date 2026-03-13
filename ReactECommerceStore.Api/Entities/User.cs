namespace ReactECommerceStore.Api.Entities;

public class User : IdentityUser
{
    public UserAddress Address { get; set; }
}

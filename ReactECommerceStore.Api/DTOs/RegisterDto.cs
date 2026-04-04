using System.ComponentModel.DataAnnotations;

namespace ReactECommerceStore.Api.DTOs;

public class RegisterDto
{
    [Required]
    public string Email { get; set; } = string.Empty;
    public required string Password { get; set; }
}

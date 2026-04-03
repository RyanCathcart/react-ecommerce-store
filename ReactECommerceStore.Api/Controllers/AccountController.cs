using Microsoft.AspNetCore.Mvc;
using ReactECommerceStore.Api.DTOs;
using ReactECommerceStore.Api.Extensions;

namespace ReactECommerceStore.Api.Controllers;

public class AccountController : BaseApiController
{
    public readonly UserManager<User> _userManager;
    private readonly StoreContext _context;
    public AccountController(UserManager<User> userManager, StoreContext context)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
        var user = new User { UserName = registerDto.Username, Email = registerDto.Email };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem();
        }

        await _userManager.AddToRoleAsync(user, "Member");

        return StatusCode(201);
    }

    //[Authorize]
    //[HttpGet("currentUser")]
    //public async Task<ActionResult<UserDto>> GetCurrentUser()
    //{
    //    var user = await _userManager.FindByNameAsync(User.Identity.Name);

    //    var userBasket = await RetrieveBasket(User.Identity.Name);

    //    return new UserDto
    //    {
    //        Email = user.Email,
    //        Token = await _tokenService.GenerateToken(user),
    //        Basket = userBasket?.MapBasketToDto()
    //    };
    //}

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<UserAddress>> GetSavedAddress()
    {
        var address = await _userManager.Users
            .Where(x => x.UserName == User.Identity!.Name)
            .Select(user => user.Address)
            .FirstOrDefaultAsync();

        if (address == null) return NoContent();

        return address;
    }
}

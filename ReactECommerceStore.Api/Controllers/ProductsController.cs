using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ReactECommerceStore.Api.Data;
using ReactECommerceStore.Api.Entities;

namespace ReactECommerceStore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly StoreContext context;
    public ProductsController(StoreContext context)
    {
        this.context = context;
    }

    [HttpGet]
    public ActionResult<List<Product>> GetProducts()
    {
        var products = context.Products.ToList();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public ActionResult<Product> GetProduct(int id)
    {
        return context.Products.Find(id);
    }
}

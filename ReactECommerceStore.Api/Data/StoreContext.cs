using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ReactECommerceStore.Api.Entities.OrderAggregate;

namespace ReactECommerceStore.Api.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Basket> Baskets { get; set; }
    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<User>()
            .HasOne(a => a.Address)
            .WithOne()
            .HasForeignKey<UserAddress>(a => a.Id)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole { Name = "Member", NormalizedName = "MEMBER", Id = "f69f4be7-3c9d-4d68-ad01-0c633f832e4a", ConcurrencyStamp = "Member" },
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN", Id = "862f75b7-f103-4446-ae07-2973c27e8a80", ConcurrencyStamp = "Admin" }
            );
    }
}

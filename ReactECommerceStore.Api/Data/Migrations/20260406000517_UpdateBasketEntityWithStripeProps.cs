using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactECommerceStore.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBasketEntityWithStripeProps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClientSecret",
                table: "Baskets",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientSecret",
                table: "Baskets");
        }
    }
}

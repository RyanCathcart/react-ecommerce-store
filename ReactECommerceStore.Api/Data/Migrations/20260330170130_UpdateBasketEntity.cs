using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactECommerceStore.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBasketEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BasketId",
                table: "Baskets",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BasketId",
                table: "Baskets");
        }
    }
}

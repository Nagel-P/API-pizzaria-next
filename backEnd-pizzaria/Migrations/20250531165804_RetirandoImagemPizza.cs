using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backEnd_pizzaria.Migrations
{
    /// <inheritdoc />
    public partial class RetirandoImagemPizza : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagemUrl",
                table: "Pizzas");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagemUrl",
                table: "Pizzas",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}

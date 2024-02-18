using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarSharing.DataAccess.Migrations
{
    public partial class RemovedField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Cars");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

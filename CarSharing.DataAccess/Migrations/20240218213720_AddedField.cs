using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarSharing.DataAccess.Migrations
{
    public partial class AddedField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsInUse",
                table: "Cars",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsInUse",
                table: "Cars");
        }
    }
}

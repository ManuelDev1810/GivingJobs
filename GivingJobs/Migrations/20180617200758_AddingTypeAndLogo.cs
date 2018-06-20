using Microsoft.EntityFrameworkCore.Migrations;

namespace GivingJobs.Migrations
{
    public partial class AddingTypeAndLogo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PathLogo",
                table: "Jobs",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Jobs",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PathLogo",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Jobs");
        }
    }
}

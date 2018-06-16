using Microsoft.EntityFrameworkCore.Migrations;

namespace GivingJobs.Migrations
{
    public partial class DeletingEmailFielFromJobModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Jobs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Jobs",
                nullable: false,
                defaultValue: "");
        }
    }
}

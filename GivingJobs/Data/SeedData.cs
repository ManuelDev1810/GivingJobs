using Microsoft.AspNetCore.Builder;
using GivingJobs.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using GivingJobs.Models;
using Microsoft.AspNetCore.Identity;

namespace GivingJobs.Data
{
    public class SeedData
    {
        public static async Task SeedAdminUser(IApplicationBuilder builder)
        {
            UserManager<AppUser> userManager = builder.ApplicationServices
                                            .GetRequiredService<UserManager<AppUser>>();
            RoleManager<IdentityRole> roleManager = builder.ApplicationServices
                                            .GetRequiredService<RoleManager<IdentityRole>>();

            if (await userManager.FindByNameAsync("Manuel") == null)
            {
                if (await roleManager.FindByNameAsync("Admin") == null)
                    await roleManager.CreateAsync(new IdentityRole("Admin"));

                AppUser user = new AppUser
                {
                    UserName = "Manuel",
                    Email = "manueldev1810@hotmail.com"
                };

                IdentityResult result = await userManager.CreateAsync(user, "Deorro1920:)");

                if (result.Succeeded)
                    await userManager.AddToRoleAsync(user,"Admin");
            }
        }

        public static void SeedCategories(IApplicationBuilder builder)
        {
            ApplicationDbContext context = builder.ApplicationServices.GetRequiredService<ApplicationDbContext>();
            context.Database.Migrate();
            if (context.Categories.Any())
            {
                context.Categories.AddRange(
                     new Category
                     {
                         Name = "Programming",
                         Description = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                         Date = DateTime.Now
                     },
                    new Category
                    {
                        Name = "Design",
                        Description = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                        Date = DateTime.Now
                    },
                    new Category
                    {
                        Name = "Databases",
                        Description = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                        Date = DateTime.Now
                    }
                );
                context.SaveChanges();
            }
        }
    }
}

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
    }
}

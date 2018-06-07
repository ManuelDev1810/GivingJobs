using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GivingJobs.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GivingJobs.Data
{
    public class AppIdentityDbContext  : IdentityDbContext<AppUser>
    {
        public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : base(options) {}
    }
}

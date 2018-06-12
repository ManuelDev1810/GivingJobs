using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GivingJobs.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GivingJobs.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}

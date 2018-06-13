using GivingJobs.Data;
using GivingJobs.Models;
using GivingJobs.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GivingJobs.Services.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        ApplicationDbContext context;
        public CategoryRepository(ApplicationDbContext dbContext)
        {
            context = dbContext;
        }

        public List<Category> Get()
        {
            return context.Categories.ToList();
        }

        public async Task<Category> GetById(int id) => await context.Categories.SingleOrDefaultAsync(m => m.Id == id);
    }
}

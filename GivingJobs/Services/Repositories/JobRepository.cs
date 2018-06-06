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
    public class JobRepository : IJobRepository
    {
        ApplicationDbContext dbContext;

        public JobRepository(ApplicationDbContext applicationDb)
        {
            dbContext = applicationDb;
        }

        public List<Job> GetAll() => dbContext.Jobs.ToList();

        public async Task<Job> Get(int id)
        {
            return await dbContext.Jobs.FindAsync(id);
        }

        public async Task<Job> Create(Job job)
        {
            dbContext.Jobs.Add(job);
            await dbContext.SaveChangesAsync();
            return job;
        }
        
        
        public async Task<Job> Edit(Job job)
        {
            dbContext.Entry(job).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
            return job;
        }

        public async Task<Job> Delete(Job job)
        {
            dbContext.Jobs.Remove(job);
            await dbContext.SaveChangesAsync();
            return job;
        }
    }
}

using GivingJobs.Data;
using GivingJobs.Models;
using GivingJobs.Services.Interfaces;
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

        public async Task<Job> Create(Job job)
        {
            dbContext.Jobs.Add(job);
            await dbContext.SaveChangesAsync();
            return job;
        }
    }
}

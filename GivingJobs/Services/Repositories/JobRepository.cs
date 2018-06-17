using GivingJobs.Data;
using GivingJobs.Models;
using GivingJobs.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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

        public async Task<List<Job>> Jobs() => await dbContext.Jobs.ToListAsync();

        public async Task<Job> Get(int id)
        {
            return await dbContext.Jobs.FindAsync(id);
        }

        public async Task<IEnumerable<Job>> GetByCategory(int id)
        {
            List<Job> jobs = await dbContext.Jobs.Where(m => m.CategoryId == id).ToListAsync();
            return jobs;
        }

        public async Task<Job> Create(Job job)
        {
            try
            {
                dbContext.Jobs.Add(job);
                await dbContext.SaveChangesAsync();
                return job;
            }catch(Exception e)
            {
                throw e;
            }
        }
        
        
        public async Task<Job> Edit(Job job)
        {
            try { 
                dbContext.Entry(job).State = EntityState.Modified;
                await dbContext.SaveChangesAsync();
                return job;
            }catch(Exception e)
            {
                throw e;
            }
        }

        public async Task<Job> Delete(Job job)
        {
            dbContext.Jobs.Remove(job);
            await dbContext.SaveChangesAsync();
            return job;
        }

        public async Task<List<Job>> JobsOfUsers(string name)
        {
            return await dbContext.Jobs.Where(m => m.userName == name).ToListAsync();
        }
    }
}

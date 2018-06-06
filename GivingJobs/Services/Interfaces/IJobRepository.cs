using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GivingJobs.Models;

namespace GivingJobs.Services.Interfaces
{
    public interface IJobRepository
    {
        List<Job> GetAll();
        Task<Job> Create(Job job);
        Task<Job> Get(int id);
        Task<Job> Edit(Job job);
        Task<Job> Delete(Job job);
    }
}

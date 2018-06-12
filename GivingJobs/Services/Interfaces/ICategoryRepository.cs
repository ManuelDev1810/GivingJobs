using GivingJobs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GivingJobs.Services.Interfaces
{
    public interface ICategoryRepository
    {
        List<Category> Get();
        Task<Category> GetById(int id);
    }
}

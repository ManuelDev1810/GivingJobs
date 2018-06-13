using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GivingJobs.Models;
using GivingJobs.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GivingJobs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {
        ICategoryRepository repository;
        IJobRepository jobRepository;
        public CategoryController(ICategoryRepository categoryRepository, IJobRepository jobRepo)
        {
            repository = categoryRepository;
            jobRepository = jobRepo;
        }

        [HttpGet]
        public  IActionResult Get()
        {
            List<Category> categories = repository.Get();
            return Ok(categories);
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                IEnumerable<Job> jobs = await jobRepository.GetByCategory(id);
                Category category  = await repository.GetById(id);
                var categoriesOfJob = new { Jobs = jobs, Categori = category };
                return Ok(categoriesOfJob);

            }catch(Exception e)
            {
                throw e;
            }
        }
    }
}

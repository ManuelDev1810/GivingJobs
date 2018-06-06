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
    public class HomeController : ControllerBase
    {
        IJobRepository jobRepository;
        public HomeController(IJobRepository repository) => jobRepository = repository;

        [HttpGet]
        public IActionResult Get()
        {
            List<Job> jobs = jobRepository.GetAll();
            return Ok(jobs);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Job model)
        {
            Job job = await jobRepository.Create(model);
            if (job != null)
                return Ok(job);
            else
                return BadRequest();
        }
    }
}

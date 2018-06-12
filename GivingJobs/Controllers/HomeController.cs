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
            jobs.Reverse();
            return Ok(jobs);
        }

        [HttpGet]
        [Route("job/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            Job job = await jobRepository.Get(id);
            if (job != null)
                return Ok(job);
            else
                return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Job model)
        {
            model.Date = DateTime.Now;
            Job job = await jobRepository.Create(model);
            if (job != null)
                return Ok(job);
            else
                return BadRequest();
        }

        [Route("id")]
        public async Task<IActionResult> Edit(int id)
        {
            Job job = await jobRepository.Get(id);
            if (job != null)
                return Ok(job);
            else
                return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Job model)
        {
            Job job = await jobRepository.Edit(model);
            if (job != null)
                return Ok(job);
            else
                return BadRequest();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            Job job = null;
            Job model = await jobRepository.Get(id);

            if (model != null)
            {
                job = await jobRepository.Delete(model);
                if (job != null)
                    return Ok(job);
                else
                    return BadRequest();
            }
            return BadRequest();   
        }
    }
}

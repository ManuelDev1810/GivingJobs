﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using GivingJobs.Models;
using GivingJobs.Services.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GivingJobs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        IJobRepository jobRepository;
        ICategoryRepository categoryRepository;
        public HomeController(IJobRepository repository, ICategoryRepository category)
        {
            jobRepository = repository;
            categoryRepository = category;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Job> Jobs = await jobRepository.Jobs();
            foreach (var job in Jobs)
            {
                job.Category = await categoryRepository.GetById(job.CategoryId);
            }
            Jobs.Reverse();
            return Ok(Jobs);
        }

        [HttpGet]
        [Route("job/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            Job job = await jobRepository.Get(id);
            job.Category = await categoryRepository.GetById(job.CategoryId);
            if (job != null)
                return Ok(job);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("jobsOfUser/{name}")]
        public async Task<IActionResult> GetJobsOfUser(string name)
        {
            List<Job> Jobs = await jobRepository.JobsOfUsers(name);
            foreach (var job in Jobs)
            {
                job.Category = await categoryRepository.GetById(job.CategoryId);
            }
            return Ok(Jobs);
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

        [EnableCors("AllowAllOrigin")]
        [Route("img")]
        [HttpPost]
        public async Task<IActionResult> CreateImg(IFormFile file)
        {
            if (file.Length != 0)
            {

                var path = Path.Combine(Directory.GetCurrentDirectory(), "E:/LocalGit/GivingJobs/ReactJs/giving-jobs/src/imgs/", file.FileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                return Ok(file);
            }
            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Job model)
        {
            //Job Model = await jobRepository.Get(id);
            Job job = await jobRepository.Edit(model);
            if (job != null)
                return Ok(job);
            else
                return BadRequest();
        }

        [Route("delete/{id}")]
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

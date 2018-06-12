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
        public CategoryController(ICategoryRepository categoryRepository)
        {
            repository = categoryRepository;
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
            Category category = await repository.GetById(id);
            return Ok(category);
        }
    }
}

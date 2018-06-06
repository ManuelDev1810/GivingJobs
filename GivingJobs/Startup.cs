﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GivingJobs.Data;
using Microsoft.Extensions;
using Microsoft.Extensions.Configuration;
using GivingJobs.Services.Repositories;
using GivingJobs.Services.Interfaces;

namespace GivingJobs
{
    public class Startup
    {
        IConfiguration Configuration;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            //Cors
            services.AddCors(options => {
                options.AddPolicy("AllowAllOrigin", builder =>
                builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                );
            });

            services.AddDbContext<ApplicationDbContext>(options => {
                options.UseSqlServer(Configuration["Data:ConnectionStrings:GivingJobsConnectionString"]);
            });

            services.AddTransient<IJobRepository, JobRepository>();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            app.UseHsts();
            app.UseStatusCodePages();
            app.UseHttpsRedirection();
            app.UseCors("AllowAllOrigin");
            app.UseMvcWithDefaultRoute();
        }
    }
}

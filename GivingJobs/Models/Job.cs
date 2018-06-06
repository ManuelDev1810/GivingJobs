using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace GivingJobs.Models
{
    public class Job
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public DateTime Date { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Email { get; set; }
    }
}

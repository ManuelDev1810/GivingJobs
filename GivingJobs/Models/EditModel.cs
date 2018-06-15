using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace GivingJobs.Models
{
    public class EditModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string OriginalName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}

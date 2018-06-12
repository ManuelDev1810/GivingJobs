using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GivingJobs.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        //public List<Job> Jobs { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace GivingJobs.Models
{
    public class AppUser : IdentityUser
    {
       [NotMapped]
       public bool Authenticated;
    }
}

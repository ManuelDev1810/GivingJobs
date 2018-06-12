using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using GivingJobs.Models;

namespace GivingJobs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        UserManager<AppUser> userManager;
        SignInManager<AppUser> signInManager;
        public AccountController(UserManager<AppUser> usrMgr, SignInManager<AppUser> sgManager)
        {
            userManager = usrMgr;
            signInManager = sgManager;
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if(model != null)
            {
                AppUser user = await userManager.FindByEmailAsync(model.Email);
                if(user != null)
                {
                    Microsoft.AspNetCore.Identity.SignInResult result = 
                        await signInManager.PasswordSignInAsync(user,model.Password,false,false);

                    if (result.Succeeded)
                    {
                        user.Authenticated = true;
                        return Ok(user);
                    } else
                    {
                        return BadRequest();
                    }
                } else
                {
                    return NotFound();
                }
            } else
            {
                return BadRequest();
            }
        }

        [Route("logout")]
        [HttpGet]
        public async Task Logout()
        {
            await signInManager.SignOutAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Register(CreateUser model)
        {
            if(model != null)
            {
                AppUser user = new AppUser
                {
                    Email = model.Email,
                    UserName = model.Name
                };

                IdentityResult result = await userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                    return Ok(user);
                else
                    AddErrosFromResult(result);
            }
            return BadRequest();
        }

        [Route("isAnAdmin")]
        [HttpGet]
        public async Task<IActionResult> IsAnAdmin()
        {
            //User.is
            AppUser user = await userManager.FindByNameAsync("Manuel");
            bool yesOrNot = await userManager.IsInRoleAsync(user, "Admin");
            if (yesOrNot)
                return Ok(yesOrNot);
            else
                return BadRequest();
        }

        void AddErrosFromResult(IdentityResult result)
        {
            foreach (var error in result.Errors)
                ModelState.AddModelError("", error.Description);
        }
    }
}

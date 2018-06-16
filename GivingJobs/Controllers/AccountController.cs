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
        IPasswordHasher<AppUser> passwordHasher;
        public AccountController(UserManager<AppUser> usrMgr, SignInManager<AppUser> sgManager, IPasswordHasher<AppUser> password)
        {
            userManager = usrMgr;
            signInManager = sgManager;
            passwordHasher = password;
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

        [Route("Edit")]
        [HttpPost]
        public async Task<IActionResult> Edit(EditModel model)
        {
            AppUser user = await userManager.FindByNameAsync(model.OriginalName);
            if(user != null)
            {
                user.UserName = model.Name;
                user.Email = model.Email;
                user.PasswordHash = passwordHasher.HashPassword(user, model.Password);
                IdentityResult result = await userManager.UpdateAsync(user);
                if (result.Succeeded)
                    return Ok(user);
                else
                    return BadRequest(new { result.Errors });
            }
            return BadRequest(user);
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

        [Route("{name}")]
        [HttpGet]
        public async Task<IActionResult> IsAnAdmin(string name)
        {
            //User.is
            AppUser user = await userManager.FindByNameAsync(name);
            bool yesOrNot = await userManager.IsInRoleAsync(user, "Admin");
            if (yesOrNot)
                return Ok(yesOrNot);
            else
                return Ok(yesOrNot);
        }

        void AddErrosFromResult(IdentityResult result)
        {
            foreach (var error in result.Errors)
                ModelState.AddModelError("", error.Description);
        }
    }
}

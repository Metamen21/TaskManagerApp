using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Generators;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagerApp.Server.Data;
using TaskManagerApp.Server.Models;

namespace TaskManagerApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public ApplicationDbContext _db;
        public JwtTokenHelper JwtTokenHelper;
        public AuthController(ApplicationDbContext db, JwtTokenHelper jwtTokenHelper)
        {
            _db = db;
            JwtTokenHelper = jwtTokenHelper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            // Generate a salt and hash the password using BCrypt
            string salt = BCrypt.Net.BCrypt.GenerateSalt(12);
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDto.Password, salt);
            var user = new User { Email = userDto.Email, PasswordHash = hashedPassword };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return Ok(user);

        }


        [HttpPost("login")]
        public IActionResult Login(UserDto userDto)
        {
            var user = _db.Users.FirstOrDefault(u => u.Email == userDto.Email);

            if (user is null || !BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash))
            {
                return Unauthorized();
            }
            var token = JwtTokenHelper.CreateJwtToken(user);
            return Ok(new { token });
        }

    }
}

using EMS.API.Models;
using EMS.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace EMS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwt;

        public AuthController(JwtService jwt)
        {
            _jwt = jwt;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto user)
        {
            if (user.username == "admin" && user.password == "admin123")
            {
                var token = _jwt.GenerateToken("admin");
                return Ok(new { token });
            }

            return Unauthorized();
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using WebApiTpi.Dtos;
using WebApiTpi.Models;
using WebApiTpi.Repositories.UserRepo.Servicio;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiTpi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JwtController : ControllerBase
    {
        private readonly UsuarioServicio _usuarioServicio;

        public JwtController(UsuarioServicio usuarioServicio)
        {
            _usuarioServicio = usuarioServicio;
        }

        [HttpPost]
        public IActionResult Login([FromBody] UsuarioDto objUserLogin)
        {
            try
            {
                var (token, expireIn) = _usuarioServicio.Authenticate(objUserLogin);
                return Ok(new { Token = token, expiresIn = expireIn });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}

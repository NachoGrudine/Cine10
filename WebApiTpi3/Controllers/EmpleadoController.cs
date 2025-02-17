using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiTpi.Repositories.PeliculasMaestro;

namespace WebApiTpi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {

        private Repositories.EmpleadoRepo.IEmpleadoRepository _repository;

        public EmpleadoController(Repositories.EmpleadoRepo.IEmpleadoRepository repository)
        {
            _repository = repository;
        }



        [HttpGet("Obtener/{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var empleado = _repository.Get(id);
                if (empleado == null)
                {
                    return NotFound($"No se encontro un empleado del user con id {id}");
                }
                return Ok(empleado);
            }
            catch
            (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }

        }
    }
}

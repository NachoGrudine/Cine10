using Microsoft.AspNetCore.Mvc;
using WebApiTpi.Repositories.AuxiliaresPeliculas;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiTpi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeliculasAuxController : ControllerBase
    {
        private IAuxiliaresPeliculasRepositorycs _repository;

        public PeliculasAuxController(IAuxiliaresPeliculasRepositorycs repository)
        {
            _repository = repository;
        }

        [HttpGet("/Obtener/Calificaciones")]

        public IActionResult ObtenerCalificaciones()
        {
            try
            {
            var lst = _repository.ObtenerCalificaciones();
            if(lst.Count == 0 || lst == null)
            {
                return NotFound("No se encontraron calificaciones");
            }
            return Ok(lst);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }
        [HttpGet("/Obtener/Generos")]

        public IActionResult ObtenerGeneros()
        {
            try
            {
            var lst = _repository.ObtenerGeneros();
            if (lst.Count == 0 || lst == null)
            {
                return NotFound("No se encontraron calificaciones");
            }
            return Ok(lst);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }
        [HttpGet("/Obtener/PaisOrigen")]

        public IActionResult ObtenerPaisOrigen()
        {
            try
            {
            var lst = _repository.ObtenerPaisOrigen();
            if (lst.Count == 0 || lst == null)
            {
                return NotFound("No se encontraron calificaciones");
            }
            return Ok(lst);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }
    }
}

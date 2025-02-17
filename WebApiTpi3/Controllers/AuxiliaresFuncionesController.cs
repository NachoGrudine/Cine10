using Microsoft.AspNetCore.Mvc;
using WebApiTpi.Models;
using WebApiTpi.Repositories.AuxiliaresFunciones;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiTpi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuxiliaresFuncionesController : ControllerBase
    {
        private readonly IAuxiliaresFuncionesRepository _repository;

        public AuxiliaresFuncionesController(IAuxiliaresFuncionesRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Idioma
        [HttpGet("idioma")]
        public ActionResult<IEnumerable<Idioma>> GetAllIdioma()
        {
            var idiomas = _repository.GettAllIdioma();
            return Ok(idiomas);
        }
        // GET: api/Tipo
        [HttpGet("tipo")]
        public ActionResult<IEnumerable<TiposProyeccione>> GetAllTipo()
        {
            var tipos = _repository.GettAllTipo();
            return Ok(tipos);
        }
        // GET: api/Sala
        [HttpGet("sala")]
        public ActionResult<IEnumerable<Sala>> GetAllSala()
        {
            var salas = _repository.GettAllSala();
            return Ok(salas);
        }

    }
}
using Microsoft.AspNetCore.Mvc;
using WebApiTpi.Models;
using WebApiTpi.Repositories.FuncionesMaestro;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiTpi3.Controllers
{
    namespace WebApiTpi3.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        public class FuncionesController : ControllerBase
        {
            private readonly IFuncionesRepository _repository;

            public FuncionesController(IFuncionesRepository repository)
            {
                _repository = repository;
            }

            // GET: api/Funciones
            [HttpGet]
            public ActionResult<IEnumerable<Funcione>> GetAll()
            {
                var funciones = _repository.GettAll();
                return Ok(funciones);
            }

            // get: /api/Funciones/filtros?fechaDes=2024-11-01&fechaHas=2024-11-10&salas=1&salas=2


            [HttpGet("filtros")]
            public ActionResult<IEnumerable<Funcione>> GettByFiltros([FromQuery] DateOnly? fechaDes, [FromQuery] DateOnly? fechaHas, [FromQuery] List<int>? salas)
            {
                var funciones = _repository.GettByFiltros(fechaDes, fechaHas, salas);

                if (funciones == null || funciones.Count == 0)
                    return NotFound("No hay funciones disponibles con los filtros especificados.");

                return Ok(funciones);
            }



            // GET: api/Funciones/5
            [HttpGet("{id}")]
            public ActionResult<Funcione> Get(int id)
            {
                var funcion = _repository.GettAll().Find(f => f.IdFuncion == id);
                if (funcion == null)
                    return NotFound("Función no encontrada.");

                return Ok(funcion);
            }

            // POST: api/Funciones
            [HttpPost]
            public ActionResult Create([FromBody] FuncionDTO funcionDto)
            {
                if (funcionDto == null)
                    return BadRequest("La función no puede ser nula.");


                Funcione funcion = new Funcione()
                {
                    Fecha = funcionDto.Fecha,
                    HorarioInicio = funcionDto.HorarioInicio,
                    IdIdioma = funcionDto.IdIdioma,
                    IdPelicula = funcionDto.IdPelicula,
                    IdSala = funcionDto.IdSala,
                    IdTipoProyeccion = funcionDto.IdTipoProyeccion
                };



                var result = _repository.Create(funcion);
                if (!result)
                    return StatusCode(500, "Error al crear la función.");

                return CreatedAtAction(nameof(Get), new { id = funcion.IdFuncion }, funcion);
            }

            // PUT: api/Funciones/5
            [HttpPut("{id}")]
            public ActionResult Update(int id, [FromBody] FuncionDTO funcionDto)
            {

                if (funcionDto == null || funcionDto.IdFuncion != id)
                    return BadRequest("La información de la función es incorrecta.");


                var funcion = _repository.GettAll().Find(f => f.IdFuncion == id);
                if (funcion == null)
                    return NotFound("Función no encontrada.");


                funcion.Fecha = funcionDto.Fecha;
                funcion.HorarioInicio = funcionDto.HorarioInicio;
                funcion.IdIdioma = funcionDto.IdIdioma;
                funcion.IdPelicula = funcionDto.IdPelicula;
                funcion.IdSala = funcionDto.IdSala;
                funcion.IdTipoProyeccion = funcionDto.IdTipoProyeccion;

                var result = _repository.Update(funcion);
                if (!result)
                    return StatusCode(500, "Error al actualizar la función.");

                return NoContent();

            }

            // DELETE: api/Funciones/5
            [HttpDelete("{id}")]
            public ActionResult Delete(int id)
            {
                var result = _repository.Delete(id);
                if (!result)
                    return NotFound("Función no encontrada o no se pudo eliminar.");

                return NoContent();
            }
        }

    }
}

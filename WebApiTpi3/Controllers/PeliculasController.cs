using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Xml;
using WebApiTpi.Dtos;
using WebApiTpi.Models;
using WebApiTpi.Repositories.PeliculasMaestro;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiTpi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeliculasController : ControllerBase
    {
        private IPeliculasRepository _repository;

        public PeliculasController(IPeliculasRepository repository)
        {
            _repository = repository;
        }
        private bool validaciones(PeliculaDto dto)
        {
            if (string.IsNullOrEmpty(dto.Titulo) || string.IsNullOrEmpty(dto.Sinopsis) ||
                dto.IdGenero <= 0 || dto.IdCalificacion <= 0 || dto.IdPaisOrigen <= 0 ||
                string.IsNullOrEmpty(dto.Productora) || string.IsNullOrEmpty(dto.Director) ||
                dto.Duracion <= 0 || dto.FechaEstreno.Year < 1900)
            {
                return false;
            }

            if (dto.Titulo.Length > 100 || dto.Sinopsis.Length > 400 ||
                dto.Productora.Length > 100 || dto.Director.Length > 50)
            {
                return false;
            }

            return true;
        }

        [HttpGet("/Obtener/Peliculas")]
        public IActionResult ObtenerPeliculas()
        {
            try
            {
                var lst = _repository.GettAll();
                if (lst.Count == 0 || lst == null)
                {
                    return NotFound("No se encontraron peliculas");
                }
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }
        [HttpGet("/Obtener/Peliculas/Hab")]
        public IActionResult ObtenerPeliculasHab()
        {
            try
            {
                var lst = _repository.ObtenerHabilitadas();
                if (lst.Count == 0 || lst == null)
                {
                    return NotFound("No se encontraron peliculas");
                }
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }
        [HttpGet("/Obtener/Peliculas/Des")]
        public IActionResult ObtenerPeliculasDes()
        {
            try
            {
                var lst = _repository.ObtenerNoHabilitadas();
                if (lst.Count == 0 || lst == null)
                {
                    return NotFound("No se encontraron peliculas");
                }
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }

        [HttpGet("Obtener/Peliculas/{id}")]
        public IActionResult ObtenerPelisPorId(int id)
        {
            try
            {
                var Pelicula = _repository.ObtenerPeliculaId(id);
                if (Pelicula == null)
                {
                    return NotFound($"No se encontro la pelicula con id {id}");
                }
                return Ok(Pelicula);
            }
            catch
            (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }

        }


        [HttpPost("/Agregar/Pelicula")]

        public IActionResult AgregarPelicula([FromBody] PeliculaDto dto)
        {
            try
            {
                if (dto == null)
                {
                    return BadRequest("Error al cargar datos");
                }

                if (validaciones(dto))
                {
                    var pelicula = new Pelicula()
                    {
                        Titulo = dto.Titulo,
                        Sinopsis = dto.Sinopsis,
                        IdGenero = dto.IdGenero,
                        IdCalificacion = dto.IdCalificacion,
                        IdPaisOrigen = dto.IdPaisOrigen,
                        Productora = dto.Productora,
                        Director = dto.Director,
                        Duracion = dto.Duracion,
                        FechaEstreno = dto.FechaEstreno,
                        Imagen = dto.Imagen,
                        Estado = dto.Estado
                    };
                    var genero = _repository.ObtenerGeneroPorId(dto.IdGenero);
                    if (genero == null)
                    {
                        return BadRequest($"Genero con ID {dto.IdGenero} no encontrado");
                    }

                    var calificacion = _repository.ObtenerCalificacionPorId(dto.IdCalificacion);
                    if (calificacion == null)
                    {
                        return BadRequest($"Calificacion con ID {dto.IdCalificacion} no encontrada");
                    }

                    var paisOrigen = _repository.ObtenerPaisOrigenPorId(dto.IdPaisOrigen);
                    if (paisOrigen == null)
                    {
                        return BadRequest($"Pais de origen con ID {dto.IdPaisOrigen} no encontrado");
                    }
                    _repository.AgregarPelucla(pelicula);
                }
                else
                {
                    return BadRequest("Error con la carga de datos");
                }

                return Ok("Agregada correctamente!!!");

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }

        [HttpPut("Actualizar/Peliculas/{id}")]
        public IActionResult ActualizarPeliculas(int id, [FromBody] PeliculaDto dto)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new { message = $"El id no puede ser {id}" });
                }

                var existe = _repository.ObtenerPeliculaId(id);
                if (existe == null)
                {
                    return NotFound(new { message = $"No se encontró la película con id {id}" });
                }

                if (dto == null)
                {
                    return BadRequest(new { message = "Error al cargar datos" });
                }

                if (validaciones(dto))
                {
                    var pelicula = new Pelicula()
                    {
                        IdPelicula = id,
                        Titulo = dto.Titulo,
                        Sinopsis = dto.Sinopsis,
                        IdGenero = dto.IdGenero,
                        IdCalificacion = dto.IdCalificacion,
                        IdPaisOrigen = dto.IdPaisOrigen,
                        Productora = dto.Productora,
                        Director = dto.Director,
                        Duracion = dto.Duracion,
                        FechaEstreno = dto.FechaEstreno,
                        Imagen = dto.Imagen,
                        Estado = dto.Estado
                    };

                    var genero = _repository.ObtenerGeneroPorId(dto.IdGenero);
                    if (genero == null)
                    {
                        return BadRequest(new { message = $"Género con ID {dto.IdGenero} no encontrado" });
                    }

                    var calificacion = _repository.ObtenerCalificacionPorId(dto.IdCalificacion);
                    if (calificacion == null)
                    {
                        return BadRequest(new { message = $"Calificación con ID {dto.IdCalificacion} no encontrada" });
                    }

                    var paisOrigen = _repository.ObtenerPaisOrigenPorId(dto.IdPaisOrigen);
                    if (paisOrigen == null)
                    {
                        return BadRequest(new { message = $"País de origen con ID {dto.IdPaisOrigen} no encontrado" });
                    }

                    bool actualizado = _repository.ActualizarPelicula(pelicula);
                    if (actualizado)
                    {
                        return Ok(new { message = "Película actualizada correctamente" });
                    }
                    else
                    {
                        return BadRequest(new { message = "No se pudo actualizar la película" });
                    }
                }

                return BadRequest(new { message = "Datos no válidos" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpDelete("/Eliminar/Peliculas/{id}")]
        public IActionResult EliminarPeliculas(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new RespuestasApi { Success = false, Message = $"El id no puede ser {id}" });
                }

                var pelicula = _repository.ObtenerPeliculaId(id);
                if (pelicula == null)
                {
                    return NotFound(new RespuestasApi { Success = false, Message = $"No se encontró la película con id {id}" });
                }

                string mensaje = "";
                bool cambioExitoso = _repository.EliminarPelicula(id);

                if (cambioExitoso)
                {
                    mensaje = pelicula.Estado == "H"
                        ? "Película Habilitada con éxito."
                        : "Película Deshabilitada con éxito.";
                    return Ok(new RespuestasApi { Success = true, Message = mensaje });
                }
                else
                {
                    return BadRequest(new RespuestasApi { Success = false, Message = $"La película con id {id} ya está en el estado deseado." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new RespuestasApi { Success = false, Message = "Error interno del servidor." });
            }
        }


    }
}
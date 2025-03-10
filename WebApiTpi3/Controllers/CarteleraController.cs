using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiTpi.Models;
using WebApiTpi.Repositories.CarteleraRepo;
using static System.Runtime.InteropServices.JavaScript.JSType;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiTpi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarteleraController : ControllerBase
    {
        private ICarteleraRepository _repository;
        
        public CarteleraController(ICarteleraRepository repo)
        {
            _repository = repo;
        }
        [HttpGet]
        public IActionResult ObtenerCarteleras()
        {
            try
            {
                var lst = _repository.GettAll();
                if (lst.Count == 0 || lst == null)
                {
                    return NotFound("No se encontraron carteleras");
                }
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }



        [HttpGet("{fecha}")]
        public IActionResult GetPorFecha(DateTime fecha)
        {
            try
            {
                var lst = _repository.ObtenerCarteleraPorFecha(fecha);
                if ( lst == null)
                {
                    return NotFound("No se encontraron carteleras");
                }
                return Ok(lst);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }




        [HttpPost]
        public ActionResult Create([FromBody] CarteleraDTO carteleraDTO)
        {
            if (carteleraDTO == null)
                return BadRequest("La cartelera no puede ser nula.");

            Cartelera cartelera = new Cartelera()
            {
                FechaInicio = carteleraDTO.FechaInicio,
                
                DetalleCarteleras = new List<DetalleCartelera>()
            };

            
            foreach (int id_pel in carteleraDTO.DetalleCarteleras)
            {
                DetalleCartelera detalleCar = new DetalleCartelera()
                {
                     IdPelicula = id_pel 
                };

               
                cartelera.DetalleCarteleras.Add(detalleCar);
            }



            var result = _repository.Create(cartelera);
            if (!result)
                return StatusCode(500, "Error al crear la cartelera.");

            return  Ok(cartelera);
        }

        [HttpPut("{id}")]
        public ActionResult Update(int id, CarteleraDTO carteleraDTO)
        {

            if (carteleraDTO == null)
                return BadRequest("La información de la función es incorrecta.");

            
            var cartelera = _repository.GettAll().Find(c => c.IdCartelera == id);
            if (cartelera == null)
                return NotFound("Función no encontrada.");



            


            var result = _repository.Update(cartelera,carteleraDTO);
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



        [HttpGet("buscar/{id}")]
        public ActionResult<Cartelera> Get(int id)
        {
            var cartelera = _repository.GettAll().Find(f => f.IdCartelera == id);
            if (cartelera == null)
                return NotFound("Cartelera no encontrada.");

            return Ok(cartelera);
        }
    }
}

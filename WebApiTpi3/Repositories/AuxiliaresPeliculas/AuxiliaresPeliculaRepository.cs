using Microsoft.EntityFrameworkCore;
using WebApiTpi.Models;

namespace WebApiTpi.Repositories.AuxiliaresPeliculas
{
    public class AuxiliaresPeliculaRepository : IAuxiliaresPeliculasRepositorycs
    {
        private cine_tp_progra1_Context _context;

        public AuxiliaresPeliculaRepository(cine_tp_progra1_Context context) { _context = context; }
        public List<Calificacione> ObtenerCalificaciones()
        {
            return _context.Calificaciones.ToList();
        }

        public List<Genero> ObtenerGeneros()
        {
            return _context.Generos.ToList();
        }

        public List<PaisesOrigene> ObtenerPaisOrigen()
        {
            return _context.PaisesOrigenes.ToList();
        }

    }
}

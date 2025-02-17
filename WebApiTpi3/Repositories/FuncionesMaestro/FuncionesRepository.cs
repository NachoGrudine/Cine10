using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApiTpi.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebApiTpi.Repositories.FuncionesMaestro
{
    public class FuncionesRepository : IFuncionesRepository
    {
        private cine_tp_progra1_Context _context;

        public FuncionesRepository(cine_tp_progra1_Context context) { _context = context; }
        public bool Create(Funcione funcion)
        {
            _context.Funciones.Add(funcion);
            return _context.SaveChanges() == 1;
        }


        public bool Delete(int id)
        {
            var funcion = _context.Funciones.SingleOrDefault(x => x.IdFuncion == id);

            if (funcion == null)
            {
                return false;
            }

            _context.Funciones.Remove(funcion);
            return _context.SaveChanges() == 1;
        }

        public List<Funcione> GettAll()
        {
            return _context.Funciones.Where(x => x.Fecha >= DateOnly.FromDateTime(DateTime.Now)).Include(x => x.IdIdiomaNavigation).Include(x => x.IdPeliculaNavigation).Include(x => x.IdSalaNavigation).Include(x => x.IdTipoProyeccionNavigation).ToList();

        }

        public List<Funcione> GettByFiltros(DateOnly? fechaDes, DateOnly? fechaHas, List<int>? salas)
        {
            
            var query = _context.Funciones.AsQueryable();

            
            if (fechaDes.HasValue && fechaHas.HasValue)
            {
                query = query.Where(x => x.Fecha >= fechaDes && x.Fecha <= fechaHas);
            }
            else if (fechaDes.HasValue)
            {
                query = query.Where(x => x.Fecha >= fechaDes);
            }
            else if (fechaHas.HasValue)
            {
                query = query.Where(x => x.Fecha <= fechaHas);
            }

            
            if (salas != null && salas.Any())
            {
                query = query.Where(x => salas.Contains(x.IdSala));
            }

           
            query = query.Include(x => x.IdIdiomaNavigation)
                         .Include(x => x.IdPeliculaNavigation)
                         .Include(x => x.IdSalaNavigation)
                         .Include(x => x.IdTipoProyeccionNavigation);

            
            return query.ToList();




        }

        public bool Update(Funcione funcion)
        {
            _context.Funciones.Update(funcion);
            return _context.SaveChanges() == 1;
        }
    }
}

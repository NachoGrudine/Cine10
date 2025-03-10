using Microsoft.EntityFrameworkCore;
using WebApiTpi.Models;

namespace WebApiTpi.Repositories.EmpleadoRepo
{
    public class EmpleadoRepository : IEmpleadoRepository
    {
        private cine_tp_progra1_Context _context;

        public EmpleadoRepository(cine_tp_progra1_Context context) { _context = context; }
        public Empleado Get(int id)
        {


            return _context.Empleados.Where(x => x.IdUsuario == id).Include(x => x.IdCargoNavigation).FirstOrDefault();
            
        }
    }
}

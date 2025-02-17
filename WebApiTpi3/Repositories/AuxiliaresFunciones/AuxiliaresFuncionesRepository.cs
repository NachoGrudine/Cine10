using WebApiTpi.Models;

namespace WebApiTpi.Repositories.AuxiliaresFunciones
{
    public class AuxiliaresFuncionesRepository : IAuxiliaresFuncionesRepository
    {

        private cine_tp_progra1_Context _context;

        public AuxiliaresFuncionesRepository(cine_tp_progra1_Context context) { _context = context; }
        public List<Idioma> GettAllIdioma()
        {
            return _context.Idiomas.ToList();
        }

        public List<Sala> GettAllSala()
        {
            return _context.Salas.ToList();
        }

        public List<TiposProyeccione> GettAllTipo()
        {
            return _context.TiposProyecciones.ToList();
        }
    }
}

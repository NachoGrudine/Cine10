using WebApiTpi.Models;
using static WebApiTpi.Repositories.UserRepo.UsuarioRepository;

namespace WebApiTpi.Repositories.UserRepo
{
    public class UsuarioRepository : IUsuarioRepository
    {
        
            private readonly cine_tp_progra1_Context _context;

            public UsuarioRepository(cine_tp_progra1_Context context)
            {
                _context = context;
            }

            public Usuario GetUserByUsername(string username)
            {
                return _context.Usuarios.SingleOrDefault(u => u.Usuario1 == username);
            }
        

    }
}

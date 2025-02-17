using WebApiTpi.Models;

namespace WebApiTpi.Repositories.UserRepo
{
    public interface IUsuarioRepository
    {
        Usuario GetUserByUsername(string username);       
    }
}

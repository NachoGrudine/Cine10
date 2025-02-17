using Microsoft.EntityFrameworkCore;
using WebApiTpi.Models;

namespace WebApiTpi.Repositories.CarteleraRepo
{
    public interface ICarteleraRepository
    {
        List<Cartelera> GettAll();
        public bool Create(Cartelera cartelera);

        
        Cartelera ObtenerCarteleraPorFecha(DateTime fecha);
        public bool Update(Cartelera cartelera, CarteleraDTO carteleraDTO);

        public bool Delete(int id);
    }
}

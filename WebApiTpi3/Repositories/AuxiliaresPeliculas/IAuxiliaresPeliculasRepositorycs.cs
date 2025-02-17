using WebApiTpi.Models;

namespace WebApiTpi.Repositories.AuxiliaresPeliculas
{
    public interface IAuxiliaresPeliculasRepositorycs
    {
        List<Genero> ObtenerGeneros();

        List<Calificacione> ObtenerCalificaciones();

        List<PaisesOrigene> ObtenerPaisOrigen();


    }
}

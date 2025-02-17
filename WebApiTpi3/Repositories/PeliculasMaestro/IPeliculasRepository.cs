using WebApiTpi.Models;

namespace WebApiTpi.Repositories.PeliculasMaestro
{
    public interface IPeliculasRepository
    {
        public List<Pelicula> GettAll();

        List<Pelicula> ObtenerHabilitadas();

        List<Pelicula> ObtenerNoHabilitadas();

        public bool AgregarPelucla(Pelicula pelicula);

        public bool ActualizarPelicula(Pelicula pelicula);


        public bool EliminarPelicula(int id);

        Pelicula ObtenerPeliculaId(int id);

        Genero ObtenerGeneroPorId(int id);
        Calificacione ObtenerCalificacionPorId(int id);
        PaisesOrigene ObtenerPaisOrigenPorId(int id);
    }
}

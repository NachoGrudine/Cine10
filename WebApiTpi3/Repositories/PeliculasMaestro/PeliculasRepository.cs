using Microsoft.EntityFrameworkCore;
using WebApiTpi.Models;

namespace WebApiTpi.Repositories.PeliculasMaestro
{
    public class PeliculasRepository : IPeliculasRepository
    {
        private cine_tp_progra1_Context _context;

        public PeliculasRepository(cine_tp_progra1_Context context) { _context = context; }

        public bool ActualizarPelicula(Pelicula pelicula)
        {
            var peliculaExistente = _context.Peliculas.FirstOrDefault(p => p.IdPelicula == pelicula.IdPelicula);
            if (peliculaExistente == null)
            {
                return false; 
            }
            peliculaExistente.Titulo = pelicula.Titulo;
            peliculaExistente.Sinopsis = pelicula.Sinopsis;
            peliculaExistente.IdGenero = pelicula.IdGenero;
            peliculaExistente.IdCalificacion = pelicula.IdCalificacion;
            peliculaExistente.IdPaisOrigen = pelicula.IdPaisOrigen;
            peliculaExistente.Productora = pelicula.Productora;
            peliculaExistente.Director = pelicula.Director;
            peliculaExistente.Duracion = pelicula.Duracion;
            peliculaExistente.FechaEstreno = pelicula.FechaEstreno;
            peliculaExistente.Imagen = pelicula.Imagen;

            int cambios = _context.SaveChanges();
            return cambios > 0; 
        }


        public bool AgregarPelucla(Pelicula pelicula)
        {

            _context.Peliculas.Add(pelicula);
            return _context.SaveChanges() > 0;
        }

        public bool EliminarPelicula(int id)
        {
            var existe = _context.Peliculas.FirstOrDefault(x => x.IdPelicula == id);

            if (existe != null && existe.Estado == "H")
            {
                existe.Estado = "D";
                _context.Peliculas.Update(existe);
                _context.SaveChanges();
                return true; 
            }
            else if (existe != null && existe.Estado == "D")
            {
                existe.Estado = "H";
                _context.Peliculas.Update(existe);
                _context.SaveChanges();
                return true; 
            }

            return false; 
        }


        public Genero ObtenerGeneroPorId(int id)
        {
            return _context.Generos.FirstOrDefault(g => g.IdGenero == id);
        }

        public Calificacione ObtenerCalificacionPorId(int id)
        {
            return _context.Calificaciones.FirstOrDefault(c => c.IdCalificacion == id);
        }

        public PaisesOrigene ObtenerPaisOrigenPorId(int id)
        {
            return _context.PaisesOrigenes.FirstOrDefault(p => p.IdPaisOrigen == id);
        }


        public List<Pelicula> GettAll()
        {
            return _context.Peliculas.ToList();

        }

        public Pelicula ObtenerPeliculaId(int id)
        {
            return _context.Peliculas.FirstOrDefault(pe => pe.IdPelicula == id);
        }

        public List<Pelicula> ObtenerHabilitadas()
        {
            return _context.Peliculas.Where(x => x.Estado == "H").ToList();
        }

        public List<Pelicula> ObtenerNoHabilitadas()
        {
            return _context.Peliculas.Where(x => x.Estado == "D").ToList();
        }
    }
}

using Microsoft.EntityFrameworkCore;
using WebApiTpi.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebApiTpi.Repositories.CarteleraRepo
{
    public class CarteleraRepository : ICarteleraRepository
    {
        private cine_tp_progra1_Context _context;

        public CarteleraRepository(cine_tp_progra1_Context context)
        {
            _context = context;
        }
        public List<Cartelera> GettAll()
        {
            return  _context.Carteleras.Include(x => x.DetalleCarteleras).ThenInclude(x => x.IdPeliculaNavigation).ToList();
        }

        public bool Create(Cartelera cartelera)
        {

            _context.Carteleras.Add(cartelera);
            return _context.SaveChanges() > 0;
        }

        public Cartelera ObtenerCarteleraPorFecha(DateTime fecha)
        {
            return _context.Carteleras.Where(x => x.FechaInicio == fecha).Include(x => x.DetalleCarteleras).ThenInclude(x => x.IdPeliculaNavigation).FirstOrDefault();
        }

        public bool Update(Cartelera cartelera,CarteleraDTO carteleraDTO)
        {
            foreach (DetalleCartelera detalle in cartelera.DetalleCarteleras)
            {
                _context.DetalleCarteleras.Remove(detalle);
            }
            cartelera.FechaInicio = carteleraDTO.FechaInicio;
            cartelera.DetalleCarteleras.Clear();




            foreach (int id_pel in carteleraDTO.DetalleCarteleras)
            {
                DetalleCartelera detalleCar = new DetalleCartelera()
                {
                    IdPelicula = id_pel
                };


                cartelera.DetalleCarteleras.Add(detalleCar);
            }
            _context.Carteleras.Update(cartelera);
            return _context.SaveChanges() == 1;
        }
   
        public bool Delete(int id)
        {
           
            var cartelera = _context.Carteleras.Include(c => c.DetalleCarteleras).SingleOrDefault(x => x.IdCartelera == id);
            if (cartelera == null)
            {
                return false;
            }
            
            foreach (DetalleCartelera detalle in cartelera.DetalleCarteleras)
            {
                _context.DetalleCarteleras.Remove(detalle);
            }
            _context.Carteleras.Remove(cartelera);
            return _context.SaveChanges() > 0;
            
            
        }


    }
}

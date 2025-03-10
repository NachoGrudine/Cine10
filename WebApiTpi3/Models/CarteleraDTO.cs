namespace WebApiTpi.Models
{
    public class CarteleraDTO
    {
        
        

        public DateTime? FechaInicio { get; set; }

        public virtual List<int> DetalleCarteleras { get; set; } = new List<int>();
        
    }
}

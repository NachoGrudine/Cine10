namespace WebApiTpi.Models
{
    public class FuncionDTO
    {

        public int IdFuncion { get; set; }

        public int IdSala { get; set; }

        public int IdPelicula { get; set; }

        public int IdTipoProyeccion { get; set; }

        public int IdIdioma { get; set; }

        public TimeOnly HorarioInicio { get; set; }

        public DateOnly Fecha { get; set; }
    }
}

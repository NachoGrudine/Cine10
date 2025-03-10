using Microsoft.AspNetCore.Hosting.Server;
using System.Collections.Generic;

namespace WebApiTpi.Dtos
{
    public class PeliculaDto
    {
        public string Titulo { get; set; }

        public string Sinopsis { get; set; }

        public int IdGenero { get; set; }

        public int IdCalificacion { get; set; }

        public int IdPaisOrigen { get; set; }

        public string Productora { get; set; }

        public string Director { get; set; }

        public int Duracion { get; set; }

        public DateTime FechaEstreno { get; set; }

        public byte[] Imagen { get; set; }

        public string Estado { get; set; }
    }
}

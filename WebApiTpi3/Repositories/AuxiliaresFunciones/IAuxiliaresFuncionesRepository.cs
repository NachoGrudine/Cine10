namespace WebApiTpi.Repositories.AuxiliaresFunciones
{
    public interface IAuxiliaresFuncionesRepository
    {
        public List<Models.Idioma> GettAllIdioma();
        public List<Models.Sala> GettAllSala();
        public List<Models.TiposProyeccione> GettAllTipo();
    }
}

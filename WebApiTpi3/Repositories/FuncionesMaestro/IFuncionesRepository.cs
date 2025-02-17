namespace WebApiTpi.Repositories.FuncionesMaestro
{
    public interface IFuncionesRepository
    {
        public List<Models.Funcione> GettAll();

        public List<Models.Funcione> GettByFiltros(DateOnly? fechaDes, DateOnly? fechaHas, List<int>? salas);

        public bool Update(Models.Funcione funcion);

        public bool Delete(int id);

        public bool Create(Models.Funcione funcion);
    }
}

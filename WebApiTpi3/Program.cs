using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using WebApiTpi.Models;
using WebApiTpi.Repositories.UserRepo.Servicio;  
using WebApiTpi.Repositories.AuxiliaresFunciones;
using WebApiTpi.Repositories.AuxiliaresPeliculas;
using WebApiTpi.Repositories.FuncionesMaestro;
using WebApiTpi.Repositories.PeliculasMaestro;
using System.Text;
using WebApiTpi.Repositories.UserRepo;
using WebApiTpi.Repositories.EmpleadoRepo;
using WebApiTpi.Repositories.CarteleraRepo;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<cine_tp_progra1_Context>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registrar servicios y repositorios
builder.Services.AddScoped<IFuncionesRepository, FuncionesRepository>();
builder.Services.AddScoped<IAuxiliaresFuncionesRepository, AuxiliaresFuncionesRepository>();
builder.Services.AddScoped<IPeliculasRepository, PeliculasRepository>();
builder.Services.AddScoped<IAuxiliaresPeliculasRepositorycs, AuxiliaresPeliculaRepository>();
builder.Services.AddScoped<ICarteleraRepository, CarteleraRepository>();

builder.Services.AddScoped<IEmpleadoRepository, EmpleadoRepository>();
// Registrar UsuarioServicio y el repositorio
builder.Services.AddScoped<UsuarioServicio>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();  // Asegúrate de tener esta implementación

// Configuración de JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "tu_issuer",  // Asegúrate de que coincida con lo que usas en el servicio
            ValidAudience = "tu_audiencia",  // Asegúrate de que coincida con lo que usas en el servicio
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("tu_clave_secreta_aqui")  // La misma clave secreta
            )
        };
    });

// Agregar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTodo",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

// Agregar controladores
builder.Services.AddControllers();

// Agregar Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Aplica la política de CORS antes de mapear los controladores
app.UseCors("PermitirTodo");

// Configuración de la canalización de solicitudes HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Activar autenticación y autorización
app.UseAuthentication();
app.UseAuthorization();

// Mapear controladores
app.MapControllers();

app.Run();

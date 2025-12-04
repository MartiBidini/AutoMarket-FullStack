using Microsoft.EntityFrameworkCore;
using AutoMarket_API.Data;

var builder = WebApplication.CreateBuilder(args);



//  Configuración de Base de Datos (SQL Server) 
// Recuperamos la cadena de conexión desde appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Registramos el DbContext para que pueda ser inyectado en los controladores
builder.Services.AddDbContext<AutoMarketContext>(options =>
    options.UseSqlServer(connectionString));

//  Configuración de CORS (Cross-Origin Resource Sharing) 
// Esencial para permitir que el Frontend (que corre en otro puerto) consuma la API
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTodo", policy =>
    {
        policy.AllowAnyOrigin()  // Permite peticiones desde cualquier origen
              .AllowAnyMethod()  // Permite todos los métodos (GET, POST, etc.)
              .AllowAnyHeader(); // Permite cualquier encabezado
    });
});

// - Servicios Base de la API ---
builder.Services.AddControllers();
// Configuración para Swagger (Documentación de la API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();

// Si estamos desarrollando, mostramos la interfaz de Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//  Aplicar la política CORS definida arriba antes de la autorización
app.UseCors("PermitirTodo");

app.UseAuthorization();

// Mapea las rutas de los controladores a los endpoints de la API
app.MapControllers();


// ARRANQUE DEL SERVIDOR
app.Run();

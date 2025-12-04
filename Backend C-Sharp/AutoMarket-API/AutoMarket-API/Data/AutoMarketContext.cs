
using AutoMarket_API.Models;    // Necesario para que reconozca la clase 'Vehiculo'
using Microsoft.EntityFrameworkCore; // Necesario para que funcione 'DbContext'

namespace AutoMarket_API.Data
{
    // DbContext: Es la clase "padre",nos permite hablar con SQL.
    public class AutoMarketContext : DbContext
    {
        
     // Recibe las "opciones" (como la dirección de la base de datos) desde Program.cs
     // y se las pasa a la clase base (DbContext) para que se conecte.
        public AutoMarketContext(DbContextOptions<AutoMarketContext> options) : base(options)
        {
        }

        // TABLAS (DbSet):
        // Esta propiedad representa la tabla "Vehiculos" en SQL.
        // Si hacés .Add() acá, EF Core hace un INSERT en la base.
        // Si hacés .ToList() acá, EF Core hace un SELECT en la base.
        public DbSet<Vehiculos> Vehiculos { get; set; }
    }
}

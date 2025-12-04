using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMarket_API.Data;
using AutoMarket_API.Models;

namespace AutoMarket_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiculosController : ControllerBase
    {
        private readonly AutoMarketContext _context;

        public VehiculosController(AutoMarketContext context)
        {
            _context = context;
        }

    
        //  GET: TRAER AUTOS (Con Filtros, Búsqueda y Paginación)
        // URL: GET api/vehiculos?buscar=ford&min=5000&pagina=1...
        
        [HttpGet]
        public async Task<ActionResult<List<Vehiculos>>> GetVehiculos(
            string? buscar = null,
            int pagina = 1,
            int cantidad = 7,
            decimal? min = null,
            decimal? max = null,
            string? marca = null,
            string? orden = null
        )
        {
            // Tamaño visual de la página (para el cálculo de Skip)
            int tamañoVisual = 6;

            var query = _context.Vehiculos.AsQueryable();

          

            // 1. Buscador de Texto (Marca o Modelo)
            if (!string.IsNullOrEmpty(buscar))
            {
                query = query.Where(v => v.Marca.Contains(buscar) || v.Modelo.Contains(buscar));
            }

            // 2. Rango de Precios
            if (min.HasValue) query = query.Where(v => v.Precio >= min.Value);
            if (max.HasValue) query = query.Where(v => v.Precio <= max.Value);

            // 3. Filtro por Marca específica (Select del costado)
            if (!string.IsNullOrEmpty(marca) && marca != "Todas")
            {
                query = query.Where(v => v.Marca == marca);
            }

            // ---ORDENAMIENTO ---
            switch (orden)
            {
                case "precio_asc":
                    query = query.OrderBy(v => v.Precio);
                    break;
                case "precio_desc":
                    query = query.OrderByDescending(v => v.Precio);
                    break;
                case "km_asc":
                    query = query.OrderBy(v => v.Kilometraje);
                    break;
                case "km_desc":
                    query = query.OrderByDescending(v => v.Kilometraje);
                    break;
                case "anio_desc": // Más nuevos primero
                    query = query.OrderByDescending(v => v.Año); 
                    break;
                case "anio_asc": // Más viejos primero
                    query = query.OrderBy(v => v.Año);
                    break;
                default:
                    query = query.OrderBy(v => v.Id); // Orden por defecto (para que la paginación no salte)
                    break;
            }

            // --- PAGINACIÓN ---
            query = query
                    .Skip((pagina - 1) * tamañoVisual)
                    .Take(cantidad);

            
            return await query.ToListAsync();
        }

    }
}

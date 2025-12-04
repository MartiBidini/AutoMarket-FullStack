namespace AutoMarket_API.Models
{
    public class Vehiculos
    {
        public int Id { get; set; } 
        public string Marca { get; set; } = string.Empty;
        public string Modelo { get; set; } = string.Empty;
        public decimal Precio { get; set; }
        public int Kilometraje { get; set; }
        public string ImagenUrl { get; set; } = string.Empty; 
        public int Año { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public string Transmision { get; set; } = string.Empty;
    }
}

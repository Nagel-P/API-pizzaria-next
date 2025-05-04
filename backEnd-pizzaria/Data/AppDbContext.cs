using Microsoft.EntityFrameworkCore;

namespace backEnd_pizzaria.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext (DbContextOptions options) : base(options) {}

        public DbSet<Cliente> Clientes{ get; set; }
    }
}
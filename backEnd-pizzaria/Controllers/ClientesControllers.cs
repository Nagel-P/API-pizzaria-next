using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backEnd_pizzaria.Data
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientesControllers : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public ClientesControllers(AppDbContext appDbContext) {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddCliente(Cliente cliente) {
            if (cliente == null) {
                return BadRequest("Dados inválidos!");
            }

            _appDbContext.Clientes.Add(cliente);
            await _appDbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes() {

            var clientes = await _appDbContext.Clientes.ToListAsync();

            return Ok(clientes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> GetCliente(int id) {

            var cliente = await _appDbContext.Clientes.FindAsync(id);

            if (cliente == null) {
                return NotFound("Cliente não encontrado no sistema!");
            }

            return Ok(cliente);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCliente(int id, [FromBody] Cliente clienteAtualizado) {

            var clienteExistente = await _appDbContext.Clientes.FindAsync(id);

            if (clienteExistente == null) {
                return NotFound("Cliente não encontrado no sistema!");
            }

            _appDbContext.Entry(clienteExistente).CurrentValues.SetValues(clienteAtualizado);

            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, clienteExistente);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCliente(int id) {

            var cliente = await _appDbContext.Clientes.FindAsync(id);

            if (cliente == null) {
                return NotFound("Cliente não encontrado no sistema!");
            }

            _appDbContext.Clientes.Remove(cliente);

            await _appDbContext.SaveChangesAsync();

            return Ok("Cliente deletado com sucesso!");
        }
    }
}
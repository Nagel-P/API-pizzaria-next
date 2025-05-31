using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backEnd_pizzaria.Services;
using backEnd_pizzaria.Dtos;

namespace backEnd_pizzaria.Data
{
    [ApiController]
    [Route("api/clientes")]
    public class ClientesController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public ClientesController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        #region CRUD

        [HttpPost]
        public async Task<IActionResult> AddCliente([FromBody] Cliente cliente)
        {
            if (cliente == null)
                return BadRequest("Dados inválidos!");

            _appDbContext.Clientes.Add(cliente);
            await _appDbContext.SaveChangesAsync();
            return Ok(cliente);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
        {
            var clientes = await _appDbContext.Clientes.ToListAsync();
            return Ok(clientes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> GetCliente(int id)
        {
            var cliente = await _appDbContext.Clientes.FindAsync(id);
            if (cliente == null)
                return NotFound("Cliente não encontrado no sistema!");
            return Ok(cliente);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCliente(int id, [FromBody] Cliente clienteAtualizado)
        {
            var clienteExistente = await _appDbContext.Clientes.FindAsync(id);
            if (clienteExistente == null)
                return NotFound("Cliente não encontrado no sistema!");

            _appDbContext.Entry(clienteExistente).CurrentValues.SetValues(clienteAtualizado);
            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, clienteExistente);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCliente(int id)
        {
            var cliente = await _appDbContext.Clientes.FindAsync(id);
            if (cliente == null)
                return NotFound("Cliente não encontrado no sistema!");

            _appDbContext.Clientes.Remove(cliente);
            await _appDbContext.SaveChangesAsync();

            return Ok("Cliente deletado com sucesso!");
        }

        #endregion

        #region Autenticação


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var cliente = await _appDbContext.Clientes
                .FirstOrDefaultAsync(c => c.Email == loginDto.Email && c.Senha == loginDto.Senha);

            if (cliente == null)
                return Unauthorized("Email ou senha inválidos");

            var token = TokenService.GenerateToken(cliente);

            return Ok(new
            {
                token,
                cliente.Id,
                cliente.Nome,
                cliente.Email
            });
        }
        
        #endregion
    }
}

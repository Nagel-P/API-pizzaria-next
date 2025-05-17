using backEnd_pizzaria.Data;
using backEnd_pizzaria.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backEnd_pizzaria.Controllers
{
    [ApiController]
    [Route("api/pizzas")]
    public class PizzasController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public PizzasController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // GET api/pizzas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pizza>>> GetPizzas()
        {
            var pizzas = await _appDbContext.Pizzas.ToListAsync();
            return Ok(pizzas);
        }

        // GET api/pizzas/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Pizza>> GetPizza(int id)
        {
            var pizza = await _appDbContext.Pizzas.FindAsync(id);
            if (pizza == null)
                return NotFound("Pizza não encontrada no sistema!");
            return Ok(pizza);
        }

        // POST api/pizzas
        [HttpPost]
        public async Task<IActionResult> AddPizza([FromBody] Pizza pizza)
        {
            if (pizza == null)
                return BadRequest("Dados inválidos!");

            _appDbContext.Pizzas.Add(pizza);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPizza), new { id = pizza.Id }, pizza);
        }

        // PUT api/pizzas/{id}
       [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePizza(int id, [FromBody] Pizza pizzaAtualizada)
        {
            var pizzaExistente = await _appDbContext.Pizzas.FindAsync(id);
            if (pizzaExistente == null)
                return NotFound(new { message = "Pizza não encontrada no sistema!" });

            // Atualiza os campos manualmente sem sobrescrever o ID
            pizzaExistente.Nome = pizzaAtualizada.Nome;
            pizzaExistente.Descricao = pizzaAtualizada.Descricao;
            pizzaExistente.Preco = pizzaAtualizada.Preco;
            pizzaExistente.ImagemUrl = pizzaAtualizada.ImagemUrl;

            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }
        // DELETE api/pizzas/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePizza(int id)
        {
            var pizza = await _appDbContext.Pizzas.FindAsync(id);
            if (pizza == null)
                return NotFound("Pizza não encontrada no sistema!");

            _appDbContext.Pizzas.Remove(pizza);
            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }
    }

    }
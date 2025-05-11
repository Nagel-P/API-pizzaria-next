using backEnd_pizzaria.Data;
using backEnd_pizzaria.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backEnd_pizzaria.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PizzasControllers : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public PizzasControllers(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddPizza([FromBody] Pizza pizza)
        {
            if (pizza == null)
                return BadRequest("Dados inválidos!");

            _appDbContext.Pizzas.Add(pizza);
            await _appDbContext.SaveChangesAsync();

            return Ok(pizza);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pizza>>> GetPizzas()
        {
            var pizzas = await _appDbContext.Pizzas.ToListAsync();

            return Ok(pizzas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> GetPizza(int id)
        {
            var pizza = await _appDbContext.Pizzas.FindAsync(id);
            if (pizza == null)
                return NotFound("Pizza não encontrada no sistema!");

            return Ok(pizza);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePizza(int id, [FromBody] Pizza pizzaAtualizada)
        {
            var pizzaExistente = await _appDbContext.Pizzas.FindAsync(id);

            if (pizzaExistente == null)
                return NotFound("Pizza não encontrada no sistema!");

            _appDbContext.Entry(pizzaExistente).CurrentValues.SetValues(pizzaAtualizada);
            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, pizzaExistente);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePizza(int id)
        {
            var pizza = await _appDbContext.Pizzas.FindAsync(id);
            if (pizza == null)
                return NotFound("Pizza não encontrada no sistema!");

            _appDbContext.Pizzas.Remove(pizza);
            await _appDbContext.SaveChangesAsync();

            return Ok("Pizza deletada com sucesso!");
        }
    }
}
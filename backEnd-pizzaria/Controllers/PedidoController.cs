using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using backEnd_pizzaria.Data;
using backEnd_pizzaria.Models;



namespace backEnd_pizzaria.Controllers
{
[Authorize] 
[ApiController]
[Route("api/pedidos")]
[Route("api/carrinho")]
public class PedidoController : ControllerBase
{
    private readonly AppDbContext _context;

    public PedidoController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("finalizar")]
    public async Task<IActionResult> FinalizarPedido([FromBody] Carrinho carrinho)
    {
        // Simulação: você deveria verificar se o pagamento foi aprovado
        bool pagamentoConfirmado = true;

        if (!pagamentoConfirmado)
            return BadRequest("Pagamento não foi confirmado.");

        var pedido = new Pedido
        {
            ClienteId = carrinho.ClienteId,
            DataHoraPedido = DateTime.Now,
            Pizzas = carrinho.Pizzas // Isso já serializa para PizzasJson
        };

        _context.Pedidos.Add(pedido);
        await _context.SaveChangesAsync();

        return Ok(new { pedido.Id, pedido.DataHoraPedido });
    }
}

}
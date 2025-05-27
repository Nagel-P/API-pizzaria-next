namespace backEnd_pizzaria.Models
{
    public class Carrinho
{
    public int ClienteId { get; set; }
    public List<Pizza> Pizzas { get; set; } = new();

    // Você pode usar isso para guardar temporariamente no cache/memória/etc.
}

}
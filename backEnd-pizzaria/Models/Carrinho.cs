namespace backEnd_pizzaria.Models
{
    public class Carrinho
{
    public int ClienteId { get; set; }
    public List<Pizza> Pizzas { get; set; } = new();
}

}
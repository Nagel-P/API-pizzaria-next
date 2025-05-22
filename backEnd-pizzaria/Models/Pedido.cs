using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;


namespace backEnd_pizzaria.Models;
public class Pedido
{
    public int Id { get; set; }
    public int ClienteId { get; set; }
    [ForeignKey("ClienteId")]
    public Cliente Cliente { get; set; }

    public string PizzasJson { get; set; }
    public DateTime DataHoraPedido { get; set; }

    [NotMapped]
    public List<Pizza> Pizzas
    {
        get => string.IsNullOrEmpty(PizzasJson)
            ? new List<Pizza>()
            : JsonSerializer.Deserialize<List<Pizza>>(PizzasJson);
        set => PizzasJson = JsonSerializer.Serialize(value);
    }
}

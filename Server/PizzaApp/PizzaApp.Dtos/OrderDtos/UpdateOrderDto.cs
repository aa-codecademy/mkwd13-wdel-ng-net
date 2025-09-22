using PizzaApp.Domain.Entities;

namespace PizzaApp.Dtos.OrderDtos
{
    public class UpdateOrderDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string AddressTo { get; set; }
        public string? Description { get; set; }
        public int OrderPrice { get; set; }
        public List<Pizza> Pizzas { get; set; }
    }
}

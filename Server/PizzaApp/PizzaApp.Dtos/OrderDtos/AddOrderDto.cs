using PizzaApp.Dtos.PizzaDtos;

namespace PizzaApp.Dtos.OrderDtos
{
    public class AddOrderDto
    {
        // ne ni treba vaka da zemame id na user, ne e dobar pristap
        //public int UserId { get; set; } 
        public string AddressTo { get; set; }
        public string? Description { get; set; }
        public int OrderPrice { get; set; }
        public List<AddPizzaDto> Pizzas { get; set; }

    }
}

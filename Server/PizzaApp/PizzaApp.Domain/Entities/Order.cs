using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PizzaApp.Domain.Entities
{
    public class Order
    {
        //[Key] // => Data Annotations
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        //[Required]
        //[MaxLength(50)]
        public string AddressTo { get; set; }
        public string Description { get; set; }
        //[Required]
        public int OrderPrice { get; set; }
        // [ForeignKey]
        public string UserId { get; set; }
        public User User { get; set; }
        public List<Pizza> Pizzas { get; set; } = new List<Pizza>();
    }
}

using PizzaApp.DataAccess.DbContext;
using PizzaApp.DataAccess.Repositories.Abstractions;
using PizzaApp.Domain.Entities;

namespace PizzaApp.DataAccess.Repositories.Implementations
{
    public class PizzaRepository : BaseRepository<Pizza>, IPizzaRepository
    {
        private readonly PizzaAppDbContext _pizzaappDbContext;

        public PizzaRepository(PizzaAppDbContext pizzaAppDbContext) :base(pizzaAppDbContext)
        {
            _pizzaappDbContext = pizzaAppDbContext;
        }
    }
}

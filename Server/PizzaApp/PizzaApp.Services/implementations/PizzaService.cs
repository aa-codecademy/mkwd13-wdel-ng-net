using AutoMapper;
using PizzaApp.DataAccess.Repositories.Abstractions;
using PizzaApp.Services.Abstractions;

namespace PizzaApp.Services.implementations
{
    public class PizzaService : IPizzaService
    {

        private readonly IPizzaRepository _pizzaRepository;
        private readonly IMapper _mapper;

        public PizzaService(IPizzaRepository pizzaRepository, IMapper mapper)
        {
            _pizzaRepository = pizzaRepository;
            _mapper = mapper;
        }
    }
}

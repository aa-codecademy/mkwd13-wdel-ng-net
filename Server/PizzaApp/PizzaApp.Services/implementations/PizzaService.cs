using AutoMapper;
using PizzaApp.DataAccess.Repositories.Abstractions;
using PizzaApp.Domain.Entities;
using PizzaApp.Dtos.PizzaDtos;
using PizzaApp.Services.Abstractions;
using PizzaApp.Shared.CustomExceptions.PizzaExceptions;
using PizzaApp.Shared.Responses;

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

        public async Task<CustomResponse<PizzaDto>> CreatePizza(string userId, AddPizzaDto addPizzaDto)
        {
            try
            {
                Pizza pizza = _mapper.Map<Pizza>(addPizzaDto);
                pizza.UserId = userId;
                await _pizzaRepository.Add(pizza);
                var pizzaDtoResult = _mapper.Map<PizzaDto>(addPizzaDto);
                return new CustomResponse<PizzaDto>() { IsSuccessfull = true, Result = pizzaDtoResult };
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<CustomResponse> DeletePizza(string userId, int pizzaId)
        {
            try
            {
                Pizza pizza = await _pizzaRepository.GetByIdInt(pizzaId);
                if (pizza == null) return new CustomResponse("Pizza Not Found!"); //Result pattern
                //if (pizza == null) throw new PizzaNotfoundException( "Pizza Not Found!"); //Exception pattern
                if (pizza.UserId != userId) return new CustomResponse("You do not have permission to delete this Pizza"); //1st way
                //if (pizza.UserId != userId)
                //    return new CustomResponse("You do not have permission to delete this Pizza"); //2nd way
                //if (pizza.UserId != userId)
                //{
                //    return new CustomResponse("You do not have permission to delete this Pizza"); //3rd way
                //} 
                await _pizzaRepository.Remove(pizza);
                return new CustomResponse() { IsSuccessfull = true, };
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<CustomResponse<List<PizzaDto>>> GetAllPizzas()
        {
            try
            {
                List<Pizza> pizzas = await _pizzaRepository.GetAll();
                List<PizzaDto> pizzaDtos = _mapper.Map<List<PizzaDto>>(pizzas);
                return new CustomResponse<List<PizzaDto>>(pizzaDtos); 
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<CustomResponse<PizzaDto>> GetPizzaById(int id)
        {
            try
            {
                Pizza pizza = await _pizzaRepository.GetByIdInt(id);
                if (pizza == null) return new CustomResponse<PizzaDto>("Pizza not found!");
                PizzaDto pizzaDto = _mapper.Map<PizzaDto>(pizza);
                return new CustomResponse<PizzaDto>(pizzaDto);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<CustomResponse<PizzaDto>> updatePizza(string userId, int pizzaId, UpdatePizzaDto updatePizzaDto)
        {
            try
            {
                Pizza pizza = await _pizzaRepository.GetByIdInt(pizzaId);
                if (pizza == null) return new CustomResponse<PizzaDto>("Pizza not found!");
                if (pizza.UserId != userId) return new CustomResponse<PizzaDto>("You do not have permission to update this pizza!");
                _mapper.Map(updatePizzaDto, pizza);
                await _pizzaRepository.Update(pizza);
                PizzaDto pizzaDtoResult = _mapper.Map<PizzaDto>(pizza);
                return new CustomResponse<PizzaDto>(pizzaDtoResult);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

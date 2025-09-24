using AutoMapper;
using PizzaApp.DataAccess.Repositories.Abstractions;
using PizzaApp.Domain.Entities;
using PizzaApp.Dtos.OrderDtos;
using PizzaApp.Services.Abstractions;
using PizzaApp.Shared.Responses;

namespace PizzaApp.Services.implementations
{
    public class OrderService : IOrderService
    {

        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public async Task<CustomResponse<OrderDto>> CreateOrder(string userId, AddOrderDto addOrderDto)
        {
            try
            {
                Order order = _mapper.Map<Order>(addOrderDto);
                order.UserId = userId;
                foreach (Pizza pizza in order.Pizzas)
                {
                    pizza.UserId = userId;
                }
                await _orderRepository.Add(order);
                OrderDto orderDtoResult = _mapper.Map<OrderDto>(order);
                return new CustomResponse<OrderDto>(orderDtoResult);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<CustomResponse> DeleteOrder(string userId, int id)
        {
            try
            {
                Order order = await _orderRepository.GetByIdInt(id);
                if (order == null) return new CustomResponse("Order not found!");
                if(order.UserId != userId) return new CustomResponse("You do not have permission to delete this order!");
                await _orderRepository.Remove(order);
                return new CustomResponse() { IsSuccessfull = true};
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<CustomResponse<List<OrderDto>>> GetAllOrders(bool isOrderForUser)
        {
            try
            {
                List<Order> orders = await _orderRepository.GetAll();
                if(isOrderForUser == true) orders = await _orderRepository.GetOrdersWithDetails();
                List<OrderDto> orderDtos = _mapper.Map<List<OrderDto>>(orders);
                return new CustomResponse<List<OrderDto>>(orderDtos);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<CustomResponse<OrderDto>> GetOrderById(int id)
        {
            try
            {
                Order order = await _orderRepository.GetByIdInt(id);
                if (order == null) return new CustomResponse<OrderDto>("Order not found!");
                OrderDto orderDto = _mapper.Map<OrderDto>(order);
                return new CustomResponse<OrderDto> { IsSuccessfull = true, Result = orderDto };
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<CustomResponse<OrderDto>> UpdateOrder(string userId, int orderId, UpdateOrderDto updateOrderDto)
        {
            try
            {
                Order order = await _orderRepository.GetByIdInt(orderId);
                if (order == null) return new CustomResponse<OrderDto>("Order not found");
                if (order.UserId != userId) return new CustomResponse<OrderDto>("You do not have permission to update this order");
                _mapper.Map(updateOrderDto, order);
                await _orderRepository.Update(order);
                OrderDto orderDto = _mapper.Map<OrderDto>(order);
                return new CustomResponse<OrderDto>() { IsSuccessfull = true, Result = orderDto};
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

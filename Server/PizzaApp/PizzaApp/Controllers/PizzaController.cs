using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaApp.Dtos.PizzaDtos;
using PizzaApp.Services.Abstractions;
using PizzaApp.Shared.CustomExceptions.PizzaExceptions;
using System.Security.Claims;

namespace PizzaApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaController : BaseController
    {
        private readonly IPizzaService _PizzaService;

        public PizzaController(IPizzaService pizzaService)
        {
            _PizzaService = pizzaService;
        }

        [HttpGet]
        public async Task<IActionResult> Getall()
        {
            try
            {
                var response = await _PizzaService.GetAllPizzas();
                return Response(response);
            }
            catch (PizzaDataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (PizzaNotfoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPizzaById(int id)
        {
            try
            {
                var response = await _PizzaService.GetPizzaById(id);
                return Response(response);
            }
            catch (PizzaDataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (PizzaNotfoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreatePizza([FromBody] AddPizzaDto addPizzaDto)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null) return BadRequest("No user identified!");
                var response = await _PizzaService.CreatePizza(userId, addPizzaDto);
                return Response(response);
            }
            catch (PizzaDataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (PizzaNotfoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}

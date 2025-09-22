using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PizzaApp.Domain.Entities;
using PizzaApp.Dtos.UserDtos;
using PizzaApp.Services.UserServices.Abstractions;
using PizzaApp.Shared.CustomExceptions.UserExceptions;
using PizzaApp.Shared.Responses;

namespace PizzaApp.Services.UserServices.Implementations
{
    public class  UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;

        public UserService(IMapper mapper, UserManager<User> userManager, ITokenService tokenService)
        {
            _mapper = mapper;
            _userManager = userManager;
            _tokenService = tokenService;
        }

        public async Task<CustomResponse> DeleteUserAsync(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                //if (user == null) throw new Exception("User Not Found");
                if (user == null) return new CustomResponse("User not found!");
                var result = await _userManager.DeleteAsync(user);
                if (!result.Succeeded)
                    return new CustomResponse(result.Errors.Select(x => x.Description));
                return new CustomResponse();
            }
            catch (UserDataException ex)
            {
                throw new UserDataException(ex.Message);
            }
            catch (UserNotFoundException ex)
            {
                throw new UserNotFoundException(ex.Message);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<CustomResponse> GetAllUsersAsync()
        {
            try
            {
                var response = new CustomResponse<List<UserDto>>();
                var users = await _userManager.Users.ToListAsync();
                var userDtos = users.Select(user => _mapper.Map<UserDto>(user)).ToList();
                response.Result = userDtos;
                response.IsSuccessfull = true;
                return response;
            }
            catch (UserDataException ex)
            {
                throw new UserDataException(ex.Message);
            }
        }

        public async Task<CustomResponse<UserDto>> GetUserByIdAsync(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user == null) return new CustomResponse<UserDto>("User not found!");
                UserDto userDto = _mapper.Map<UserDto>(user);
                return new CustomResponse<UserDto>(userDto);
            }
            catch (UserDataException ex)
            {
                throw new UserDataException(ex.Message);
            }
        }

        public Task<CustomResponse<LoginUserResponseDto>> LoginUserAsync(LoginUserRequestDto request)
        {
            throw new NotImplementedException();
        }

        public Task<CustomResponse<RegisterUserResponse>> RegisterUserAsync(RegisterUserRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<CustomResponse<UpdateUserDto>> UpdateUserAsync(string id, UpdateUserDto updatedUser)
        {
            throw new NotImplementedException();
        }
    }
}

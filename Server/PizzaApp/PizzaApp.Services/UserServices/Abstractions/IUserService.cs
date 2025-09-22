using PizzaApp.Dtos.UserDtos;
using PizzaApp.Shared.Responses;

namespace PizzaApp.Services.UserServices.Abstractions
{
    public interface IUserService
    {
        Task<CustomResponse<RegisterUserResponse>> RegisterUserAsync(RegisterUserRequest request);
        Task<CustomResponse<LoginUserResponseDto>> LoginUserAsync(LoginUserRequestDto request);
        Task<CustomResponse> GetAllUsersAsync();
        Task<CustomResponse<UserDto>> GetUserByIdAsync(string id);
        Task<CustomResponse<UpdateUserDto>> UpdateUserAsync(string id, UpdateUserDto updatedUser);
        Task<CustomResponse> DeleteUserAsync(string id);
    }
}

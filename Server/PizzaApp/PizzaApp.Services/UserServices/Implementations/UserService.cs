using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PizzaApp.Domain.Entities;
using PizzaApp.Dtos.UserDtos;
using PizzaApp.Services.UserServices.Abstractions;
using PizzaApp.Shared.CustomExceptions.UserExceptions;
using PizzaApp.Shared.Responses;
using System.IdentityModel.Tokens.Jwt;

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
            catch (Exception)
            {
                throw;
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
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<CustomResponse<LoginUserResponseDto>> LoginUserAsync(LoginUserRequestDto request)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request.Username))
                    throw new UserDataException("Username is a required field!");

                if (string.IsNullOrWhiteSpace(request.Password))
                    throw new UserDataException("Password is a required field!");

                var user = await _userManager.FindByNameAsync(request.Username);

                if(user == null)
                    return new CustomResponse<LoginUserResponseDto>() { IsSuccessfull = false, Errors = new List<string>() { "user does not exist!" } };

                bool isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);
                if (!isPasswordValid)
                    return new CustomResponse<LoginUserResponseDto>() { IsSuccessfull = false, Errors = new List<string>() { "invalid password!" } };

                var token = await _tokenService.GenerateTokenAsync(user);

                return new CustomResponse<LoginUserResponseDto>(new LoginUserResponseDto
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(token),
                    ValidTo = token.ValidTo
                });
            }
            catch (UserDataException ex)
            {
                throw new UserDataException(ex.Message);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<CustomResponse<RegisterUserResponse>> RegisterUserAsync(RegisterUserRequest request)
        {

            try
            {
                if (string.IsNullOrWhiteSpace(request.Username))
                    throw new UserDataException("Username is a required field!");

                if (string.IsNullOrWhiteSpace(request.Password))
                    throw new UserDataException("Password is a required field!");

                if (string.IsNullOrWhiteSpace(request.Email))
                    throw new UserDataException("Email is a required field!");

                UserDto userDto = new UserDto { UserName = request.Username, Email = request.Email };
                var result = await _userManager.CreateAsync(userDto, request.Password);

                if (!result.Succeeded) return new(result.Errors.Select(x => x.Description));

                return new(new RegisterUserResponse
                {
                    Id = userDto.Id,
                    Username = userDto.UserName,
                    Email = userDto.Email,
                });
            }
            catch (UserDataException ex)
            {
                throw new UserDataException(ex.Message);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<CustomResponse<UpdateUserDto>> UpdateUserAsync(string id, UpdateUserDto updatedUser)
        {
            try
            {
                User? user = await _userManager.FindByIdAsync(id);
                if (user == null) return new CustomResponse<UpdateUserDto>("User not found!");
                _mapper.Map(user, updatedUser);
                var result = await _userManager.UpdateAsync(user);
                var userDtoResult = _mapper.Map<UpdateUserDto>(user);
                if (!result.Succeeded) return new CustomResponse<UpdateUserDto>(result.Errors.Select(x => x.Description));
                return new CustomResponse<UpdateUserDto>(userDtoResult);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

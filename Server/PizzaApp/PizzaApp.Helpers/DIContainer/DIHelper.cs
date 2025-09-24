using Microsoft.Extensions.DependencyInjection;
using PizzaApp.DataAccess.Repositories.Abstractions;
using PizzaApp.DataAccess.Repositories.Implementations;
using PizzaApp.Services.Abstractions;
using PizzaApp.Services.implementations;
using PizzaApp.Services.UserServices.Abstractions;
using PizzaApp.Services.UserServices.Implementations;

namespace PizzaApp.Helpers.DIContainer
{
    public static class DIHelper
    {
        public static void InjectRepositories(IServiceCollection services)
        {
            services.AddTransient<IPizzaRepository, PizzaRepository>();
            services.AddTransient<IOrderRepository, OrderRepository>();
        }

        public static void InjectServices(IServiceCollection services)
        {
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ITokenService, TokenService>();
            services.AddTransient<IPizzaService, PizzaService>();
            services.AddTransient<IOrderService, OrderService>();
        }
    }
}

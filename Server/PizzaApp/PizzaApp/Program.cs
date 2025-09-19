using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PizzaApp.DataAccess.DbContext;
using PizzaApp.Domain.Entities;
using PizzaApp.Helpers.DIContainer;
using PizzaApp.Shared.Settings;

var builder = WebApplication.CreateBuilder(args);

//how to make object for saving the values from appsettings.json to AppSettings class
var appSettings = builder.Configuration.GetSection("AppSettings");
builder.Services.Configure<AppSettings>(appSettings);
AppSettings appSettingsObject = appSettings.Get<AppSettings>();
var connectionString = appSettingsObject.ConnectionString;

//Adding the db context into our APP with our connectionString
builder.Services.AddDbContext<PizzaAppDbContext>(option =>
option.UseNpgsql("Host=127.0.0.1; Database=PizzaApp_v2025; Username=postgres; Password=postgres")); // ULTRA BAD WAY!
//option.UseNpgsql(connectionString)); // OPTIONS PATTERN

builder.Services.AddDataProtection();
// adding identity with USER into our APP
builder.Services.AddIdentityCore<User>(option =>
{
    option.SignIn.RequireConfirmedAccount = false;
})
    .AddEntityFrameworkStores<PizzaAppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

DIHelper.InjectRepositories(builder.Services);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CORSPolicy");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();

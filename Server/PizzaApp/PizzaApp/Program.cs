using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PizzaApp.DataAccess.DbContext;
using PizzaApp.Domain.Entities;
using PizzaApp.Helpers.DIContainer;
using PizzaApp.Mappers.MapperConfig;
using PizzaApp.Shared.Settings;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

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
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly); // Adding automapper
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme // using microsoft.openapi.models
    {
        Description = "Standard Authorization header using the beared scheme, e.g." +
        "\bearer {token} \"",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    c.OperationFilter<SecurityRequirementsOperationFilter>(); // install swashbucke.aspnetcore.filters
});

builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; // install Microsoft.AspNetCore.Authentication.JwtBearer
    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(option =>
    {
        option.TokenValidationParameters = new TokenValidationParameters // using Microsoft.IdentityModel.Tokens
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

DIHelper.InjectRepositories(builder.Services);
DIHelper.InjectServices(builder.Services);

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

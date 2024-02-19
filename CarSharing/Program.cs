using CarSharing.DataAccess.DataContext;
using CarSharing.DataAccess.Interfaces;
using CarSharing.DataAccess.Mappings;
using CarSharing.DataAccess.Repositories;
using CarSharing.Extensions;
using CarSharing.Mappers;
using CarSharing.Services;
using CarSharing.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

builder.Services.RegisterDependencies(configuration);
builder.Services.AddControllers();

builder.Services.AddDbContext<CarSharingContext>(o => o.UseSqlServer("Data Source=DESKTOP-4ALQ0CF;Initial Catalog=CarSharing;Trusted_Connection=True;"));

builder.Services.AddScoped<ICarRepository, CarRepository>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<IFineRepository, FineRepository>();
builder.Services.AddScoped<IReservationRepository, ReservationRepository>();

builder.Services.AddScoped<ICarService, CarService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IFineService, FineService>();
builder.Services.AddScoped<IReservationService, ReservationService>();

builder.Services.AddAutoMapper(mapperConfigurationExpression =>
{
    mapperConfigurationExpression.AddProfile<ContractToDomain>();
    mapperConfigurationExpression.AddProfile<DomainToSqlProfile>();
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin",
        b => b.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors("AllowOrigin");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors("AllowOrigin");

// app.UseRouting();
app.MapControllers();

app.Run();

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
builder.Services.AddDbContext<CarSharingContext>(o => o.UseSqlServer("Server=localhost;Database=CarSharing;User Id=sa;Password=Strong.Pwd-123;ConnectRetryCount=0;"));
builder.Services.AddScoped<ICarRepository, CarRepository>();
builder.Services.AddScoped<ICarService, CarService>();
builder.Services.AddAutoMapper(mapperConfigurationExpression =>
{
    mapperConfigurationExpression.AddProfile<ContractToDomain>();
    mapperConfigurationExpression.AddProfile<DomainToSqlProfile>();
});
var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

// app.UseRouting();
app.MapControllers();

app.Run();

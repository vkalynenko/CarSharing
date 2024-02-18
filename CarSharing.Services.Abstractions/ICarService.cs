using CarSharing.Domain.DTOs;

namespace CarSharing.Services.Abstractions;

public interface ICarService
{
    public Task<int> AddCar(Car request);

    public Task<Car> GetCarById(int id);

    public Task<List<Car>> GetAllCars();

    public Task UpdateCar(Car request);

    public Task DeleteCar(int id);
}
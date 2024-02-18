using AutoMapper;
using CarSharing.DataAccess.Interfaces;
using CarSharing.Domain.DTOs;
using CarSharing.Services.Abstractions;

namespace CarSharing.Services;

public class CarService : ICarService
{
    private readonly ICarRepository _repository;

    public CarService(ICarRepository repository)
    {
        _repository = repository;
    }

    public async Task<int> AddCar(Car request)
    {
        return await _repository.AddCar(request);
    }

    public async Task<Car> GetCarById(int id)
    {
        return await _repository.GetCar(id);
    }

    public async Task<List<Car>> GetAllCars()
    {
        return await _repository.GetAll();
    }

    public async Task UpdateCar(Car request)
    {
        await _repository.UpdateCar(request);
    }

    public async Task DeleteCar(int id)
    {
        await _repository.DeleteCar(id);
    }
}
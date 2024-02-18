using AutoMapper;
using CarSharing.DataAccess.DataContext;
using CarSharing.DataAccess.Entities;
using CarSharing.DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CarSharing.DataAccess.Repositories;

public class CarRepository : ICarRepository
{
    private readonly CarSharingContext _context;
    private readonly IMapper _mapper;

    public CarRepository(CarSharingContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<int> AddCar(Car car)
    {
        await _context.Cars.AddAsync(car);
        await _context.SaveChangesAsync();

        return car.Id;
    }

    public async Task<int> AddCar(Domain.DTOs.Car car)
    {
        var model = _mapper.Map<Car>(car);
        await _context.Cars.AddAsync(model);
        await _context.SaveChangesAsync();

        return model.Id;
    }

    public async Task<Domain.DTOs.Car> GetCar(int id)
    {
        var car = await _context.Cars.SingleOrDefaultAsync(c => c.Id == id);
        return _mapper.Map<Domain.DTOs.Car>(car);
    }

    public async Task UpdateCar(Domain.DTOs.Car car)
    {
        var carToUpdate = await _context.Cars.SingleAsync(c => c.Id == car.Id);
        carToUpdate.Brand = car.Brand;
        carToUpdate.Model = car.Model;
        carToUpdate.SeatsQuantity = car.SeatsQuantity;
        carToUpdate.GearBox = car.GearBox;
        carToUpdate.ReleaseYear = car.ReleaseYear;
        carToUpdate.DailyRentalPrice = car.DailyRentalPrice;
        carToUpdate.IsInUse = car.IsInUse;

        await _context.SaveChangesAsync();
    }

    public async Task<List<Domain.DTOs.Car>> GetAll()
    {
        var cars = await _context.Cars.ToListAsync();
        return _mapper.Map<List<Domain.DTOs.Car>>(cars);
    }

    public async Task DeleteCar(int id)
    {
        var car = _context.Cars.Single(c => c.Id == id);
        _context.Cars.Remove(car);
        await _context.SaveChangesAsync();
    }
}

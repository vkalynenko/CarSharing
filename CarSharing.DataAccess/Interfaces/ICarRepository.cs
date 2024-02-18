namespace CarSharing.DataAccess.Interfaces;

public interface ICarRepository
{
    public Task<int> AddCar(Domain.DTOs.Car car);

    public Task<Domain.DTOs.Car> GetCar(int id);

    public Task UpdateCar(Domain.DTOs.Car car);

    public Task<List<Domain.DTOs.Car>> GetAll();

    public Task DeleteCar(int id);
}
using CarSharing.Domain.DTOs;

namespace CarSharing.Services.Abstractions;

public interface IReservationService
{
    public Task<Reservation> GetById(int id);

    public Task<int> Add(CreateReservation model);

    public Task<List<Reservation>> GetAll();
}
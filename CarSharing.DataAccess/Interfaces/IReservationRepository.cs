using CarSharing.Domain.DTOs;

namespace CarSharing.DataAccess.Interfaces;

public interface IReservationRepository
{
    public Task<Reservation> GetById(int id);
    
    public Task<List<Reservation>> GetAll();

    public Task<int> Add(CreateReservation model);
}
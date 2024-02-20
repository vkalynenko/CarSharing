using CarSharing.DataAccess.Interfaces;
using CarSharing.Domain.DTOs;
using CarSharing.Services.Abstractions;

namespace CarSharing.Services;

public class ReservationService : IReservationService
{
    private readonly IReservationRepository _repository;

    public ReservationService(IReservationRepository repository)
    {
        _repository = repository;
    }

    public async Task<Reservation> GetById(int id)
    {
        var reservation =  await _repository.GetById(id);
        reservation.TotalSum = GetTotalSum(reservation);
        return reservation;
    }

    public async Task<int> Add(CreateReservation model)
    {
        return await _repository.Add(model);
    }

    public async Task<List<Reservation>> GetAll()
    {
        var reservations = await _repository.GetAll();
        foreach (var reservation in reservations)
        {
            reservation.TotalSum = GetTotalSum(reservation);
        }

        return reservations;
    }

    public async Task Update(UpdateReservation reservation)
    {
        await _repository.Update(reservation);
    }

    public async Task DeleteById(int id)
    {
        await _repository.DeleteById(id);
    }

    private double GetTotalSum(Reservation reservation)
    {
        var discount = reservation.Customer.IsRegular ? 0.95 : 1;
        var targetDate = reservation.ActualReturnDate ?? reservation.ExpectedReturnDate;
        var totalDays = Math.Ceiling(reservation.ExpectedReturnDate.Subtract(reservation.StartDate).TotalDays);
        double finesSum = 0;
        foreach (var fine in reservation.Fines)
        {
            finesSum += fine.Price;
        }
        
        if (reservation.ActualReturnDate.HasValue)
        {
            finesSum += Math.Ceiling(reservation.ActualReturnDate.Value.Subtract(reservation.ExpectedReturnDate).TotalDays) * reservation.Car.DailyRentalPrice * 1.05;
            return (reservation.Car.DailyRentalPrice * totalDays + finesSum) * discount;
        }

        return (reservation.Car.DailyRentalPrice * totalDays + finesSum) * discount;
    }
}
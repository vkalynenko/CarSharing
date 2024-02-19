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

    private double GetTotalSum(Reservation reservation)
    {
        var discount = reservation.Customer.IsRegular ? 0.95 : 1;
        var targetDate = reservation.ActualReturnDate ?? reservation.ExpectedReturnDate;
        var totalDays = targetDate.Subtract(reservation.StartDate);
        double finesSum = 0;
        foreach (var fine in reservation.Fines)
        {
            finesSum += fine.Price;
        }

        return (reservation.Car.DailyRentalPrice * totalDays.Days + finesSum) * discount;
    }
}
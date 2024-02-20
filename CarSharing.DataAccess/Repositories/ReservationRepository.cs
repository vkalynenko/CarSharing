using AutoMapper;
using CarSharing.DataAccess.DataContext;
using CarSharing.DataAccess.Entities;
using CarSharing.DataAccess.Interfaces;
using CarSharing.Domain.DTOs;
using Microsoft.EntityFrameworkCore;
using Reservation = CarSharing.Domain.DTOs.Reservation;

namespace CarSharing.DataAccess.Repositories;

public class ReservationRepository : IReservationRepository
{
    private readonly CarSharingContext _context;
    private readonly IMapper _mapper;

    public ReservationRepository(CarSharingContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<Reservation> GetById(int id)
    {
        var reservation = await _context.Reservations.Where(x => x.Id == id)
            .Include(x => x.Car)
            .Include(x => x.Customer)
            .Include(x => x.ReservationFines)
            .ThenInclude(x => x.Fine).SingleAsync();

        return _mapper.Map<Reservation>(reservation);
    }

    public async Task<List<Reservation>> GetAll()
    {
        var reservation = await _context.Reservations
            .Include(x => x.Car)
            .Include(x => x.Customer)
            .Include(x => x.ReservationFines)
            .ThenInclude(x => x.Fine).ToListAsync();

        return _mapper.Map<List<Reservation>>(reservation);
    }

    public async Task<int> Add(CreateReservation model)
    {
        var sqlModel = _mapper.Map<Entities.Reservation>(model);
        await _context.Reservations.AddAsync(sqlModel);
        var car = await _context.Cars.SingleAsync(x => x.Id == sqlModel.CarId);
        car.IsInUse = true;

        await _context.SaveChangesAsync();
        return sqlModel.Id;
    }

    public async Task Update(UpdateReservation reservation)
    {
        var reservationToUpdate = await _context.Reservations.SingleAsync(x => x.Id == reservation.Id);
        var reservationFines = new List<ReservationFine>();
        reservationFines.AddRange(reservation.FineIds.Select(x => new ReservationFine
        {
            ReservationId = reservation.Id,
            FineId = x
        }));
        reservationToUpdate.ReservationFines = reservationFines;

        reservationToUpdate.CustomerId = reservation.CustomerId;

        reservationToUpdate.StartDate = reservation.StartDate;
        reservationToUpdate.ExpectedReturnDate = reservation.ExpectedReturnDate;
        reservationToUpdate.ActualReturnDate = reservation.ActualReturnDate;
        
        if (reservation.ActualReturnDate.HasValue)
        {
            var car = await _context.Cars.SingleAsync(x => x.Id == reservation.CarId);
            car.IsInUse = false;
            
            var user = await _context.Customers.SingleAsync(x => x.Id == reservation.CustomerId);
            var userReservation = await _context.Reservations.Where(x => x.Customer.Id == reservation.CustomerId).CountAsync();
            if (userReservation >= 3)
            {
                user.IsRegular = true;
            }
        }

        if (reservationToUpdate.CarId != reservation.CarId)
        {
            var oldCar = await _context.Cars.SingleAsync(x => x.Id == reservationToUpdate.CarId);
            var newCar = await _context.Cars.SingleAsync(x => x.Id == reservation.CarId);

            oldCar.IsInUse = false;
            newCar.IsInUse = true;
            reservationToUpdate.CarId = reservation.CarId;
        }

        await _context.SaveChangesAsync();
    }

    public async Task DeleteById(int id)
    {
        var reservation = await _context.Reservations.SingleAsync(x => x.Id == id);
        _context.Reservations.Remove(reservation);
        await _context.SaveChangesAsync();
    }
}
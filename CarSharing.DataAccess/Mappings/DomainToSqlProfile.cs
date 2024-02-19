using AutoMapper;
using CarSharing.DataAccess.Entities;

namespace CarSharing.DataAccess.Mappings;

public class DomainToSqlProfile: Profile
{
    public DomainToSqlProfile()
    {
        CreateMap<CarSharing.Domain.DTOs.Car, Car>();
        CreateMap<Car, CarSharing.Domain.DTOs.Car>();
        CreateMap<CarSharing.Domain.DTOs.Customer, Customer>();
        CreateMap<Customer, CarSharing.Domain.DTOs.Customer>();
        CreateMap<CarSharing.Domain.DTOs.Fine, Fine>();
        CreateMap<Fine, CarSharing.Domain.DTOs.Fine>();
        CreateMap<CarSharing.Domain.DTOs.Reservation, Reservation>();
        CreateMap<Reservation, CarSharing.Domain.DTOs.Reservation>();
        CreateMap<CarSharing.Domain.DTOs.CreateReservation, Reservation>();
    }
}
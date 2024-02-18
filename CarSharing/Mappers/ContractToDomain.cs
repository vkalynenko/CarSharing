using AutoMapper;
using CarSharing.Contracts;

namespace CarSharing.Mappers;

public class ContractToDomain: Profile
{
    public ContractToDomain()
    {
        CreateMap<AddCarRequest, Domain.DTOs.Car>();
        CreateMap<Domain.DTOs.Car, Car>().ReverseMap();
    }
}
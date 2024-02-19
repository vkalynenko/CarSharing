using AutoMapper;
using CarSharing.Contracts;

namespace CarSharing.Mappers;

public class ContractToDomain: Profile
{
    public ContractToDomain()
    {
        CreateMap<AddCarRequest, Domain.DTOs.Car>();
        CreateMap<Domain.DTOs.Car, Car>().ReverseMap();
        CreateMap<AddCustomerRequest, Domain.DTOs.Customer>();
        CreateMap<UpdateCustomerRequest, Domain.DTOs.Customer>();
        CreateMap<Customer, Domain.DTOs.Customer>().ReverseMap();
        CreateMap<Fine, Domain.DTOs.Fine>().ReverseMap();
    }
}
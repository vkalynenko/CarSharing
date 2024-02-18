using CarSharing.DataAccess.Interfaces;
using CarSharing.Domain.DTOs;
using CarSharing.Services.Abstractions;

namespace CarSharing.Services;

public class CustomerService : ICustomerService
{
    private readonly ICustomerRepository _repository;

    public CustomerService(ICustomerRepository repository)
    {
        _repository = repository;
    }

    public async Task<int> AddCustomer(Customer customer)
    {
        return await _repository.AddCustomer(customer);
    }

    public async Task<Customer> GetCustomer(int id)
    {
        return await _repository.GetCustomer(id);
    }

    public async Task UpdateCustomer(Customer customer)
    {
        await _repository.UpdateCustomer(customer);
    }

    public async Task<List<Customer>> GetAll()
    {
        return await _repository.GetAll();
    }

    public async Task DeleteCustomer(int id)
    {
        await _repository.DeleteCustomer(id);
    }
}
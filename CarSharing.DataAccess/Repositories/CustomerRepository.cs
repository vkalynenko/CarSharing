using AutoMapper;
using CarSharing.DataAccess.DataContext;
using CarSharing.DataAccess.Interfaces;
using CarSharing.Domain.DTOs;
using Microsoft.EntityFrameworkCore;

namespace CarSharing.DataAccess.Repositories;

public class CustomerRepository : ICustomerRepository
{
    private readonly CarSharingContext _context;
    private readonly IMapper _mapper;

    public CustomerRepository(CarSharingContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<int> AddCustomer(Customer customer)
    {
        var model = _mapper.Map<Entities.Customer>(customer);
        await _context.Customers.AddAsync(model);
        await _context.SaveChangesAsync();

        return model.Id;
    }

    public async Task<Customer> GetCustomer(int id)
    {
        var customer = await _context.Customers.SingleOrDefaultAsync(c => c.Id == id);
        return _mapper.Map<Customer>(customer);
    }

    public async Task UpdateCustomer(Customer customer)
    {
        var customerToUpdate = await _context.Customers.SingleAsync(c => c.Id == customer.Id);

        customerToUpdate.Email = customer.Email;
        customerToUpdate.FirstName = customer.FirstName;
        customerToUpdate.LastName = customer.LastName;
        customerToUpdate.PhoneNumber = customer.PhoneNumber;
        customer.IsRegular = customer.IsRegular;

        await _context.SaveChangesAsync();
    }

    public async Task<List<Customer>> GetAll()
    {
        var customers = await _context.Customers.ToListAsync();
        return _mapper.Map<List<Customer>>(customers);
    }

    public async Task DeleteCustomer(int id)
    {
        var customer = await _context.Customers.SingleOrDefaultAsync(c => c.Id == id);
        
        _context.Customers.Remove(customer);
        await _context.SaveChangesAsync();
    }
}
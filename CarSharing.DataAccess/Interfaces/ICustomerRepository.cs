namespace CarSharing.DataAccess.Interfaces;

public interface ICustomerRepository
{
    public Task<int> AddCustomer(Domain.DTOs.Customer customer);

    public Task<Domain.DTOs.Customer> GetCustomer(int id);

    public Task UpdateCustomer(Domain.DTOs.Customer customer);

    public Task<List<Domain.DTOs.Customer>> GetAll();

    public Task DeleteCustomer(int id);
}
using CarSharing.DataAccess.Interfaces;
using CarSharing.Domain.DTOs;
using CarSharing.Services.Abstractions;

namespace CarSharing.Services;

public class FineService : IFineService
{
    private readonly IFineRepository _repository;

    public FineService(IFineRepository repository)
    {
        _repository = repository;
    }

    public async Task<int> Add(Fine customer)
    {
        return await _repository.Add(customer);
    }

    public async Task<Fine> GetById(int id)
    {
        return await _repository.GetById(id);
    }

    public async Task Update(Fine customer)
    {
        await _repository.Update(customer);
    }

    public async Task<List<Fine>> GetAll()
    {
        return await _repository.GetAll();
    }

    public async Task Delete(int id)
    {
        await _repository.Delete(id);
    }
}
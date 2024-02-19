namespace CarSharing.Services.Abstractions;

public interface IFineService
{
    public Task<int> Add(Domain.DTOs.Fine customer);

    public Task<Domain.DTOs.Fine> GetById(int id);

    public Task Update(Domain.DTOs.Fine customer);

    public Task<List<Domain.DTOs.Fine>> GetAll();

    public Task Delete(int id);
}
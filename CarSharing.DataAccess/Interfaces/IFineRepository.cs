namespace CarSharing.DataAccess.Interfaces;

public interface IFineRepository
{
    public Task<int> Add(Domain.DTOs.Fine request);

    public Task<Domain.DTOs.Fine> GetById(int id);

    public Task Update(Domain.DTOs.Fine request);

    public Task<List<Domain.DTOs.Fine>> GetAll();

    public Task Delete(int id);
}
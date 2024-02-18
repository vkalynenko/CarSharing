using AutoMapper;
using CarSharing.DataAccess.DataContext;
using CarSharing.DataAccess.Interfaces;
using CarSharing.Domain.DTOs;
using Microsoft.EntityFrameworkCore;

namespace CarSharing.DataAccess.Repositories;

public class FineRepository : IFineRepository
{
    private readonly CarSharingContext _context;
    private readonly IMapper _mapper;

    public FineRepository(CarSharingContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<int> Add(Fine request)
    {
        var model = _mapper.Map<Entities.Fine>(request);
        await _context.Fines.AddAsync(model);
        await _context.SaveChangesAsync();

        return model.Id;
    }

    public async Task<Fine> GetById(int id)
    {
        var customer = await _context.Fines.SingleOrDefaultAsync(c => c.Id == id);
        return _mapper.Map<Fine>(customer);
    }

    public async Task Update(Fine request)
    {
        var modelToUpdate = await _context.Fines.SingleAsync(c => c.Id == request.Id);

        modelToUpdate.Description = request.Description;
        modelToUpdate.Price = request.Price;
        
        await _context.SaveChangesAsync();
    }

    public async Task<List<Fine>> GetAll()
    {
        var models = await _context.Fines.ToListAsync();
        return _mapper.Map<List<Fine>>(models);
    }

    public async Task Delete(int id)
    {
        var model = await _context.Fines.SingleOrDefaultAsync(c => c.Id == id);
        
        _context.Fines.Remove(model);
        await _context.SaveChangesAsync();
    }
}
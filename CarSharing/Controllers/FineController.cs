using AutoMapper;
using CarSharing.Contracts;
using CarSharing.Services.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace CarSharing.Controllers;

[ApiController]
public class FineController: ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IFineService _service;
    
    public FineController(IMapper mapper, IFineService service)
    {
        _mapper = mapper;
        _service = service;
    }
    
    [HttpPost("fine")]
    public async Task<int> AddFine(Fine request)
    {
        return await _service.Add(_mapper.Map<Domain.DTOs.Fine>(request));
    }
    
    [HttpGet("fine/{id}")]
    public async Task<Fine> GetFineById([FromRoute] int id)
    {
        var fine =  await _service.GetById(id);
        return _mapper.Map<Fine>(fine);
    }
    
    [HttpGet("fine")]
    public async Task<List<Fine>> GetAllFines()
    {
        var fine =  await _service.GetAll();
        return _mapper.Map<List<Fine>>(fine);
    }
    
    [HttpPut("fine")]
    public async Task<IActionResult> UpdateFine(Fine request)
    {
        var fine = _mapper.Map<Domain.DTOs.Fine>(request);
        await _service.Update(fine);
        return Ok();
    }
    
    [HttpDelete("fine/{id}")]
    public async Task<IActionResult> DeleteFine([FromRoute] int id)
    {
        await _service.Delete(id);
        return Ok();
    }
}
using AutoMapper;
using CarSharing.Contracts;
using CarSharing.Domain.DTOs;
using CarSharing.Services.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Reservation = CarSharing.Contracts.Reservation;

namespace CarSharing.Controllers;

[ApiController]
public class ReservationController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IReservationService _service;

    public ReservationController(IMapper mapper, IReservationService service)
    {
        _mapper = mapper;
        _service = service;
    }

    [HttpPost("reservation")]
    public async Task<int> AddReservation(AddReservationRequest request)
    {
        return await _service.Add(_mapper.Map<Domain.DTOs.CreateReservation>(request));
    }

    [HttpGet("reservation/{id:int}")]
    public async Task<Reservation> GetById(int id)
    {
        var response = await _service.GetById(id);
        return _mapper.Map<Reservation>(response);
    }

    [HttpGet("reservation")]
    public async Task<List<Reservation>> GetAll()
    {
        var response = await _service.GetAll();
        return _mapper.Map<List<Reservation>>(response);
    }

    [HttpPut("reservation")]
    public async Task<IActionResult> Update(UpdateReservationRequest request)
    {
        await _service.Update(_mapper.Map<UpdateReservation>(request));
        return Ok();
    }
    
    [HttpDelete("reservation/{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteById(id);
        return Ok();
    }
}
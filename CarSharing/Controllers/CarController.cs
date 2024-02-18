using AutoMapper;
using CarSharing.Contracts;
using CarSharing.Services.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Car = CarSharing.Contracts.Car;

namespace CarSharing.Controllers;

[ApiController]
public class CarController : ControllerBase
{
    private readonly ICarService _service;
    private readonly IMapper _mapper;

    public CarController(ICarService service, IMapper mapper)
    {
        _service = service;
        _mapper = mapper;
    }

    [HttpPost("car")]
    [ProducesResponseType(typeof(AddCarResponse), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public async Task<int> AddCar(AddCarRequest request)
    {
        var car = _mapper.Map<Domain.DTOs.Car>(request);
        return await _service.AddCar(car);
    }
    
    [HttpGet("car/{id}")]
    [ProducesResponseType(typeof(AddCarResponse), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public async Task<Car> GetCarById([FromRoute] int id)
    {
        var car =  await _service.GetCarById(id);
        return _mapper.Map<Car>(car);
    }
    
    [HttpGet("car")]
    [ProducesResponseType(typeof(AddCarResponse), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public async Task<List<Car>> GetAllCars()
    {
        var car =  await _service.GetAllCars();
        return _mapper.Map<List<Car>>(car);
    }
    
    [HttpPut("car")]
    [ProducesResponseType(typeof(AddCarResponse), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> UpdateCar(Car request)
    {
        var car = _mapper.Map<Domain.DTOs.Car>(request);
        await _service.UpdateCar(car);
        return Ok();
    }
    
    [HttpDelete("car/{id}")]
    [ProducesResponseType(typeof(AddCarResponse), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> DeleteCar([FromRoute] int id)
    {
        await _service.DeleteCar(id);
        return Ok();
    }
}
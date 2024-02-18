using AutoMapper;
using CarSharing.Contracts;
using CarSharing.Services.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace CarSharing.Controllers;

[ApiController]
public class CustomerController : ControllerBase
{
    private readonly ICustomerService _service;
    private readonly IMapper _mapper;

    public CustomerController(ICustomerService service, IMapper mapper)
    {
        _service = service;
        _mapper = mapper;
    }
    
    [HttpPost("customer")]
    public async Task<int> AddCustomer(AddCustomerRequest request)
    {
        var customer = _mapper.Map<Domain.DTOs.Customer>(request);
        return await _service.AddCustomer(customer);
    }
    
    [HttpGet("customer/{id}")]
    public async Task<Customer> GetCustomerById([FromRoute] int id)
    {
        var customer =  await _service.GetCustomer(id);
        return _mapper.Map<Customer>(customer);
    }
    
    [HttpGet("customer")]
    public async Task<List<Customer>> GetAllCustomers()
    {
        var customers =  await _service.GetAll();
        return _mapper.Map<List<Customer>>(customers);
    }
    
    [HttpPut("customer")]
    public async Task<IActionResult> UpdateCustomer(Customer request)
    {
        var customer = _mapper.Map<Domain.DTOs.Customer>(request);
        await _service.UpdateCustomer(customer);
        return Ok();
    }
    
    [HttpDelete("customer/{id}")]
    public async Task<IActionResult> DeleteCustomer([FromRoute] int id)
    {
        await _service.DeleteCustomer(id);
        return Ok();
    }
}
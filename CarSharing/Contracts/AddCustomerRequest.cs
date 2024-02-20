namespace CarSharing.Contracts;

public class AddCustomerRequest
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public string PhoneNumber { get; set; }
    
    public string PassportNumber { get; set; }
}
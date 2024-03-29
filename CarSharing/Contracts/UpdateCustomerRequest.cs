namespace CarSharing.Contracts;

public class UpdateCustomerRequest
{
    public int Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public string PhoneNumber { get; set; }
    
    public bool IsRegular { get; set; }
    
    public string PassportNumber { get; set; }
}
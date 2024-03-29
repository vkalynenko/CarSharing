namespace CarSharing.DataAccess.Entities;

public class Customer
{
    public int Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public string PhoneNumber { get; set; }
    
    public bool IsRegular { get; set; }

    public DateTime? IsRegularFrom { get; set; }

    public string PassportNumber { get; set; }
}
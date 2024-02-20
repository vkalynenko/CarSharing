namespace CarSharing.Contracts;

public class AddReservationRequest
{
    public DateTime StartDate { get; set; }

    public DateTime ExpectedReturnDate { get; set; }
    
    public int CarId { get; set; }

    public int CustomerId { get; set; }
    
    public string PassportNumber { get; set; }
}
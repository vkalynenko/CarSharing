namespace CarSharing.Domain.DTOs;

public class CreateReservation
{
    public DateTime StartDate { get; set; }

    public DateTime ExpectedReturnDate { get; set; }
    
    public int CarId { get; set; }

    public int CustomerId { get; set; }
}
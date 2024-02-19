namespace CarSharing.Domain.DTOs;

public class UpdateReservation
{
    public int Id { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime ExpectedReturnDate { get; set; }

    public DateTime? ActualReturnDate { get; set; }

    public int CarId { get; set; }

    public int CustomerId { get; set; }

    public List<int> FineIds { get; set; }
}
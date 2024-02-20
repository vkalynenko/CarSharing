using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace CarSharing.DataAccess.Entities;

public class Reservation
{
    public int Id { get; set; }
    
    public DateTime StartDate { get; set; }

    public DateTime ExpectedReturnDate { get; set; }

    public DateTime? ActualReturnDate { get; set; }

    public int CarId { get; set; }

    public int CustomerId { get; set; }

    public DateTime CreatedAt { get; set; } // datetime.now

    public Car Car { get; set; }

    public Customer Customer { get; set; }
    
    public virtual ICollection<ReservationFine> ReservationFines { get; set; }
}
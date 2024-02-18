namespace CarSharing.DataAccess.Entities;

public class Reservation
{
    public int Id { get; set; }
    
    public DateTime StartDate { get; set; }

    public DateTime ExpectedReturnDate { get; set; }

    public DateTime? ActualReturnDate { get; set; }

    public Car Car { get; set; }

    public Customer Customer { get; set; }
    
    public virtual ICollection<Fine> Fines { get; set; }
}
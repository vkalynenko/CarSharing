namespace CarSharing.DataAccess.Entities;

public class Fine
{
    public int Id { get; set; }

    public string Description { get; set; }

    public double Price { get; set; }
    
    public virtual ICollection<ReservationFine> ReservationFines { get; set; }
}
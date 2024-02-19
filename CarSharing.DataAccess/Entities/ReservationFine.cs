namespace CarSharing.DataAccess.Entities;

public class ReservationFine
{
    public int Id { get; set; }

    public int FineId { get; set; }

    public int ReservationId { get; set; }

    public Fine Fine { get; set; }

    public Reservation Reservation { get; set; }
}
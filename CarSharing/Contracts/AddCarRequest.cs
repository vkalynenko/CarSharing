namespace CarSharing.Contracts;

public class AddCarRequest
{
    public string Brand { get; set; }

    public string Model { get; set; }

    public string GearBox { get; set; }

    public int SeatsQuantity { get; set; }

    public double DailyRentalPrice { get; set; }

    public int ReleaseYear { get; set; }

    public bool IsInUse { get; set; } = false;
}
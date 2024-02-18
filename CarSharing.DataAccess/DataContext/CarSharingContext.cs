using CarSharing.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CarSharing.DataAccess.DataContext;

public class CarSharingContext: DbContext
{
    public CarSharingContext(DbContextOptions<CarSharingContext> options)
        :base(options)
    { }

    public DbSet<Car> Cars { get; set; }

    public DbSet<Customer> Customers { get; set; }

    public DbSet<Fine> Fines { get; set; }

    public DbSet<Reservation> Reservations { get; set; }
}
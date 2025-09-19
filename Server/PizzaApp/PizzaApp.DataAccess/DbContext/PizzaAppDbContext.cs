using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PizzaApp.Domain.Entities;

namespace PizzaApp.DataAccess.DbContext
{
    public class PizzaAppDbContext : IdentityDbContext<User>
    {
        public PizzaAppDbContext(DbContextOptions options) : base(options)
        {
            //Ova podole pri sekoj start ja brise i rekreira bazata
            //idealno koga ja gradime na pocetok 
            //Database.EnsureDeleted();
            //Database.EnsureCreated();
        }

        //reprezentacija na tabelite od baza
        public DbSet<Pizza> Pizza { get; set; }
        public DbSet<Order> Order { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //FLUENTAPI => nacin na setiranje na relaciite na tabelite i propertinjata
            //TABLE RELATIONSHIPS
            //PROPERTY CONSTRAINTS

            #region Relationships

            //Order => user relation
            builder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(o => o.Orders)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Pizza => user relation
            builder.Entity<Pizza>()
                .HasOne(u => u.User)
                .WithMany(p => p.Pizzas)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Order => Pizza relation
            builder.Entity<Order>()
                .HasMany(p => p.Pizzas)
                .WithOne(o => o.Order)
                .HasForeignKey(i => i.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            #endregion

            #region Properties 

            //ORDERS
            builder.Entity<Order>()
                .HasKey(k => k.Id);

            builder.Entity<Order>()
                .Property(a => a.AddressTo)
                .IsRequired()
                .HasMaxLength(50);

            builder.Entity<Order>()
                .Property(d => d.Description)
                .HasMaxLength(500);

            builder.Entity<Order>()
                .Property(o => o.OrderPrice)
                .IsRequired();

            //PIZZAS
            builder.Entity<Pizza>()
                .HasKey(k => k.Id);

            builder.Entity<Pizza>()
                .Property(n => n.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Entity<Pizza>()
                .Property(p => p.Description)
                .HasMaxLength(500);

            builder.Entity<Pizza>()
                .Property(p => p.Price)
                .IsRequired();

            #endregion
        }
    }
}

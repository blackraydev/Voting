using System;
using Voting.Models;
using Microsoft.EntityFrameworkCore;

namespace Voting {
    public class AppDbContext : DbContext {
        public DbSet<Users> Users { get; set; }
        public DbSet<Votings> Votings { get; set; }
        public DbSet<Criterias> Criterias { get; set; }
        public DbSet<Participants> Participants { get; set; }
        public DbSet<Votes> Votes { get; set; }

        public AppDbContext() {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseMySql(
                "server=localhost;user=root;password=89372908085hfvbkm;database=voting;",
                new MySqlServerVersion(new Version(8, 0, 11))
            );
        }
    }
}
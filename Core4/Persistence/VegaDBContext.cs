using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core4.Models;
using Microsoft.EntityFrameworkCore;

namespace Core4.Persistence
{
    public class VegaDBContext : DbContext
    {
        public DbSet<Model> Models { get; set; }
        public DbSet<Vehcile> Vehciles { get; set; }
        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }

        public VegaDBContext(DbContextOptions<VegaDBContext> options):base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VehcileFeature>().HasKey(vf => new { vf.VehcileId, vf.FeatureId });
        }


    }
}

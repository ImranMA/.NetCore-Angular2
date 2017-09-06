using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Core4.Persistence;

namespace Core4.Migrations
{
    [DbContext(typeof(VegaDBContext))]
    partial class VegaDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Core4.Models.Feature", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("Features");
                });

            modelBuilder.Entity("Core4.Models.Make", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("Makes");
                });

            modelBuilder.Entity("Core4.Models.Model", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("MakeId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.HasIndex("MakeId");

                    b.ToTable("Models");
                });

            modelBuilder.Entity("Core4.Models.Vehcile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ContactEmail")
                        .HasMaxLength(255);

                    b.Property<string>("ContactName")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<string>("ContactPhone")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<DateTime>("LastUpdate");

                    b.Property<int>("ModelId");

                    b.Property<bool>("isRegistered");

                    b.HasKey("Id");

                    b.HasIndex("ModelId");

                    b.ToTable("Vehciles");
                });

            modelBuilder.Entity("Core4.Models.VehcileFeature", b =>
                {
                    b.Property<int>("VehcileId");

                    b.Property<int>("FeatureId");

                    b.HasKey("VehcileId", "FeatureId");

                    b.HasIndex("FeatureId");

                    b.ToTable("VehcileFeatures");
                });

            modelBuilder.Entity("Core4.Models.Model", b =>
                {
                    b.HasOne("Core4.Models.Make", "Make")
                        .WithMany("Models")
                        .HasForeignKey("MakeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Core4.Models.Vehcile", b =>
                {
                    b.HasOne("Core4.Models.Model", "Model")
                        .WithMany()
                        .HasForeignKey("ModelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Core4.Models.VehcileFeature", b =>
                {
                    b.HasOne("Core4.Models.Feature", "Feature")
                        .WithMany()
                        .HasForeignKey("FeatureId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Core4.Models.Vehcile", "Vehcile")
                        .WithMany("Features")
                        .HasForeignKey("VehcileId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}

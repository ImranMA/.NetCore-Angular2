using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.FileProviders;
using System.IO;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Http;
using Core4.Persistence;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Core4.Core;
using Core4.Core.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Core4
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            services.AddTransient<IPhotoStorage, FileSystemPhotoStorage>();
            services.AddTransient<IPhotoService, PhotoService>();
            services.AddScoped<IVehcileRepository, VehcileRepository>();
            services.AddScoped<IPhotoRepository, PhotoRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.Configure<PhotoSettings>(Configuration.GetSection("PhotoSettings"));

            services.AddAutoMapper();
            // Add framework services.
            services.AddMvc();


          

            services.AddDbContext<VegaDBContext>(options => options.UseSqlServer(Configuration["ConnectionStrings:Default"]));




        }
        private static void HandleBranch(IApplicationBuilder app)
        {
            app.Run(async context =>
            {
                var branchVer = context.Request.Query["branch"];
                await context.Response.WriteAsync($"Branch used = {branchVer}");
                });
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.MapWhen(context => context.Request.Query.ContainsKey("branch"),
                              HandleBranch);



            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
                //app.webpackmiddleware
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            

            app.UseStaticFiles();


            var options = new JwtBearerOptions
            {
                Authority= "https://coreanglr2spa.au.auth0.com/",
                Audience = "https://api.coreanglr2spa.com"
            };

            app.UseJwtBearerAuthentication(options);
            
            //app.UseAuthentication();
            

            // app.UseFileServer(false);

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "node_modules")),
                RequestPath = "/node_modules"
            });
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapRoute(
                  name: "spa-fallback",
                  template: "{*url}", defaults: new { controller = "Home", action = "Index" });
            });

          
        }
    }
}

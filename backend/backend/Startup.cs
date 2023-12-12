/*
 * File: Startup.cs
 * Description: Contains the startup class of the application.
 * Author: team ticketForYou
 * Created: - GroupID - 110 (team - ticketForYou )
 * Modified: 
 *       October 8, 2023
 *      
 */

namespace backend
{
    // Represents the startup class of the application.
    public class Startup
    {
        public IConfiguration configRoot
        {
            get;
        }

        // Initializes a new instance of the <see cref="Startup"/> class.
        public Startup(IConfiguration configuration)
        {
            configRoot = configuration;
        }

        // Configures the services for the application.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAnyOrigin",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
            });
        }

        // Configures the application's request pipeline.
        public void Configure(WebApplication app, IWebHostEnvironment env)
        {

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers(); 
            app.UseCors("AllowAnyOrigin");
            app.Run();
        }
    }
}

/*
 * File: Program.cs
 * Description: Contains the configurations of the aoolication.
 * Author: GroupID - 110 (team - ticketForYou )
 * Created: - October 5, 2023
 * Modified: 
 *       October 8, 2023
 *      
 */


using backend;
using backend.Models;
using backend.Services;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

//created with the help of availble resoucers on the internet

var builder = WebApplication.CreateBuilder(args);

// Configure user store database settings

builder.Services.Configure<UserStoreDatabaseSettings>(builder.Configuration.GetSection(nameof(UserStoreDatabaseSettings)));

builder.Services.AddSingleton<IUserStoreDatabaseSettings>(sp => sp.GetRequiredService<IOptions<UserStoreDatabaseSettings>>().Value);

builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetValue<string>("UserStoreDatabaseSettings:ConnectionString")));

builder.Services.AddScoped<IUserService, UserService>();

// Configure train store database settings

builder.Services.Configure<TrainStoreDatabaseSettings>(builder.Configuration.GetSection(nameof(TrainStoreDatabaseSettings)));

builder.Services.AddSingleton<ITrainStoreDatabaseSettings>(sp => sp.GetRequiredService<IOptions<TrainStoreDatabaseSettings>>().Value);

builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetValue<string>("TrainStoreDatabaseSettings:ConnectionString")));

builder.Services.AddScoped<ITrainService, TrainService>();




// Configure ticket store database settings

builder.Services.Configure<TicketStoreDatabaseSettings>(builder.Configuration.GetSection(nameof(TicketStoreDatabaseSettings)));

builder.Services.AddSingleton<ITicketStoreDatabaseSettings>(sp => sp.GetRequiredService<IOptions<TicketStoreDatabaseSettings>>().Value);

builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetValue<string>("TicketStoreDatabaseSettings:ConnectionString")));

builder.Services.AddScoped<ITicketService, TicketService>();

// Add services to the container.

builder.Services.AddControllers();
// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Create an instance of Startup and configure services

var startup = new Startup(builder.Configuration);
startup.ConfigureServices(builder.Services);

// Build the application

var app = builder.Build();
startup.Configure(app, builder.Environment);

/*
 * File: TicketService.cs
 * Description: Contains the implementation of ticket service related database connections.
 * Author: GroupID - 110 (team - ticketForYou )
 * Created: - October 5, 2023
 * Modified: 
 *       
 *      
 */

using backend.Models;
using MongoDB.Driver;

namespace backend.Services
{
    // Represents a service for managing tickets.
    public class TicketService : ITicketService
    {
        private readonly IMongoCollection<Ticket> _ticket;

        // Initializes a new instance of TicketService
        //The database settings
        //The MongoDB client
        public TicketService(ITicketStoreDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _ticket = database.GetCollection<Ticket>(settings.TicketCollectionName);
        }

        // Creates a new ticket.
        public int Create(Ticket tickets)
        {
            try
            {
                _ticket.InsertOne(tickets);
                return 1;
            }
            catch (MongoWriteException ex)
            {
                return 0;
            }
        }

        // Retrieves all tickets.
        public List<Ticket> Get()
        {
            return _ticket.Find(ticket => true).ToList();
        }

        // Retrieves tickets for a specific user.
        public List<Ticket> GetUser(string user_id)
        {
            return _ticket.Find(ticket => ticket.UserId == user_id).ToList();
        }

        
        // Retrieves a ticket by its ID.
        public Ticket Get(string id)
        {
            return _ticket.Find(ticket => ticket.Id == id).FirstOrDefault();
        }

        // Removes a ticket by its ID.
        public void Remove(string id)
        {
            _ticket.DeleteOne(ticket => ticket.Id == id);
        }

        public void Update(string id, Ticket ticket)
        {
            _ticket.ReplaceOne(ticket => ticket.Id == id, ticket);
        }
    }
}

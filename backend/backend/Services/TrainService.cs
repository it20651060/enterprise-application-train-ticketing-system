/*
 * File: TrainService.cs
 * Description: Contains the implementation of train service related database connections.
 * Author: GroupID - 110 (team - ticketForYou )
 * Created: - October 5, 2023
 * Modified: 
 *       
 *      
 */


using backend.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace backend.Services
{
    // Represents a service for managing trains.
    public class TrainService : ITrainService
    {

        // Initializes a new instance of TrainService
        //The database settings
        //The MongoDB client

        private readonly IMongoCollection<Train> _train;
        private readonly IMongoCollection<Ticket> _ticket;
        public TrainService(ITrainStoreDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _train = database.GetCollection<Train>(settings.TrainCollectionName);
            _ticket = database.GetCollection<Ticket>("tickets");
        }

        // Retrieves all active trains.
        public List<Train> GetActive()
        {
            return _train.Find(train => train.Cancel == false).ToList();
        }

        // Creates a new train.
        public int Create(Train trains)
        {
            try
            {
                _train.InsertOne(trains);
                return 1;
            }
            catch (MongoWriteException ex)
            {
                return 0;
            }
        }

        // Checks if a ticket for the specified train exists.
        public int Ticket(string train)
        {
            try
            {
                if (_ticket.CountDocuments(ticket => ticket.TrainId == train) == 0)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch (MongoWriteException ex)
            {
                return 0;
            }
        }

        // Retrieves the ticket status for the specified train.
        public int GetTicket(string train)
        {
            try
            {
                if (_ticket.CountDocuments(ticket => ticket.TrainId == train) == 0)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch (MongoWriteException ex)
            {
                return 0;
            }
        }

        // Retrieves all trains.
        public List<Train> Get()
        {
            return _train.Find(train => true).ToList();
        }

        // Retrieves a train by its ID.
        public Train Get(string id)
        {
            return _train.Find(train => train.Id == id).FirstOrDefault();
        }

        
        // Removes a train by its ID.
        public void Remove(string id)
        {
            _train.DeleteOne(train => train.Id == id);
        }

        // Updates a train by its ID.
        public void Update(string id, Train train)
        {
            _train.ReplaceOne(train => train.Id == id, train);
        }
    }
}

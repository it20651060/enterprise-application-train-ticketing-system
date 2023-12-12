/*
 * File: UserService.cs
 * Description: Contains the implementation of user service related database connections.
 * Author: GroupID - 110 (team - ticketForYou )
 * Created: - October 5, 2023
 * Modified: 
 *       
 *      
 */

using backend.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace backend.Services
{
    // Represents a service for managing users.
    public class UserService : IUserService
    {
        // Initializes a new instance of UserService
        //The database settings
        //The MongoDB client
        private readonly IMongoCollection<Users> _user;
        public UserService(IUserStoreDatabaseSettings settings,IMongoClient mongoClient) {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _user = database.GetCollection<Users>(settings.UserCollectionName);
            var indexKeysDefinition = Builders<Users>.IndexKeys.Ascending(x => x.Nic);
            var indexOptions = new CreateIndexOptions { Unique = true };
            var model = new CreateIndexModel<Users>(indexKeysDefinition, indexOptions);

            _user.Indexes.CreateOne(model);
        }

        // Authenticates a user by their email address.
        public Users login(string email)
        {
            return _user.Find(user => user.Email == email).FirstOrDefault();
        }

        // Creates a new user.
        public int Create(Users user)
        {
            try
            {
                _user.InsertOne(user);
                return 1;
            }
            catch (MongoWriteException ex)
            {
                return 0;
            }
        }

        // Retrieves all users.
        public List<Users> Get()
        {
            return _user.Find(user => true).ToList();
        }

        // Retrieves a user by their ID.
        public Users Get(string id)
        {
            return _user.Find(user => user.Id == id).FirstOrDefault();
        }

        // Removes a user by their ID.
        public void Remove(string id)
        {
            _user.DeleteOne(user => user.Id == id);
        }

        // Updates a user by their ID.
        public void Update(string id, Users user)
        {
            _user.ReplaceOne(user => user.Id == id,user);
        }
    }
}

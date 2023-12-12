/*
 * File: UserStoreDatabaseSettings.cs
 * Description: Contains the method settings for the user store..
 * Author: GroupID - 110 (team - ticketForYou )
 * Created: - October 5, 2023
 * Modified: 
 *       October 9, 2023
 *      
 */

namespace backend.Models
{
    // Represents the database settings for the user store.
    public class UserStoreDatabaseSettings : IUserStoreDatabaseSettings
    {
        public string UserCollectionName { get; set; } = String.Empty;
        public string ConnectionString { get; set; } = String.Empty;
        public string DatabaseName { get; set; } = String.Empty;
    }
}

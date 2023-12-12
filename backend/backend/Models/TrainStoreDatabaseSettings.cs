/*
 * File: TrainStoreDatabaseSettings.cs
 * Description: Contains the method settings for the train store..
 * Author: GroupID - 110 (team - ticketForYou )
 * Created: - October 5, 2023
 * Modified: 
 *       October 9, 2023
 *      
 */

namespace backend.Models
{
    // Represents the database settings for the train store.
    public class TrainStoreDatabaseSettings : ITrainStoreDatabaseSettings
    {
        public string TrainCollectionName { get; set; } = String.Empty;
        public string ConnectionString { get; set; } = String.Empty;
        public string DatabaseName { get; set; } = String.Empty;
    }
}

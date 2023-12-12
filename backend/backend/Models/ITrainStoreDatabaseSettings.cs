/*
 * File: ITrainStoreDatabaseSettings.cs
 * Description: Contains the interface for train store database settings.
 * Author: GroupID - 110 (team - ticketForYou )
 * Created: - October 5, 2023
 * Modified: 
 *       October 9, 2023
 *      
 */


namespace backend.Models
{
    // contains the interface for train store database settings.
    public interface ITrainStoreDatabaseSettings
    {
        string TrainCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}

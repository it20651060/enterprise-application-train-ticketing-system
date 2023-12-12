/*
 * File: ITicketStoreDatabaseSettings.cs
 * Description: Contains the interfaces for ticket store database settings.
 * Author: GroupID - 110 (team - ticketForYou )
 * Created: - October 5, 2023
 * Modified: 
 *       October 9, 2023
 *      
 */

namespace backend.Models
{

    // Represents the interface for ticket store database settings.
    public interface ITicketStoreDatabaseSettings
    {
        string TicketCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}

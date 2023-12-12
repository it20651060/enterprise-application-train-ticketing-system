/*
 * File: TicketStoreDatabaseSettings.cs
 * Description: Contains the method settings for the ticket store..
 * Author: GroupID - 110 (team - ticketForYou )
 * Created: - October 5, 2023
 * Modified: 
 *       October 9, 2023
 *      
 */


namespace backend.Models
{
    public class TicketStoreDatabaseSettings : ITicketStoreDatabaseSettings
    {
        public string TicketCollectionName { get; set; } = String.Empty;
        public string ConnectionString { get; set; } = String.Empty;
        public string DatabaseName { get; set; } = String.Empty;
    
    }
}

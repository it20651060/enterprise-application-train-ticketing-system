/*
 * File: ITicketService.cs
 * Description: Contains the the interfaces of ticket API routes.
 * Author: GroupID - 110 (team - ticketForYou )
 * Created: - October 5, 2023
 * Modified: 
 *       
 *      
 */

using backend.Models;

namespace backend.Services
{
    public interface ITicketService
    {
        //interface for ticket routes
        List<Ticket> Get();
        Ticket Get(string id);
        int Create(Ticket ticket);
        void Update(string id, Ticket ticket);
        List<Ticket> GetUser(string user_id);
        void Remove(string id);
    }
}

/*
 * File: ITrainService.cs
 * Description: Contains the the interfaces of train API routes.
 * Author: GroupID - 110 (team - ticketForYou )
 * Created: - October 5, 2023
 * Modified: 
 *       
 *      
 */

using backend.Models;

namespace backend.Services
{
    public interface ITrainService
    {
        //interface for train routes
        List<Train> Get();
        Train Get(string id);
        int Ticket(string train);
        int Create(Train train);
        List<Train> GetActive();
        void Update(string id, Train train);
        void Remove(string id);
    }
}

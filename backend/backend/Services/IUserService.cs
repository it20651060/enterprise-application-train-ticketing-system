/*
 * File: IUserService.cs
 * Description: Contains the the interfaces of user API routes.
 * Author: GroupID - 110 (team - ticketForYou )
 * Created: - October 5, 2023
 * Modified: 
 *       
 *      
 */

using backend.Models;

namespace backend.Services
{
    public interface IUserService
    {
        //interface for user routes
        List<Users> Get();
        Users Get(string id);
        int Create(Users user);
        Users login(string email);
        void Update(string id,Users user);
        void Remove(string id);
    }
}

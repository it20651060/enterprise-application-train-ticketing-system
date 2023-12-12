/*
 * File: UsersController.cs
 * Description: Contains the the implementations of user API routes.
 * Author: GroupID - 110 (team - ticketForYou )
 * Created: - October 5, 2023
 * Modified: 
 *       October 7, 2023
 *      
 */

using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;



namespace backend.Controllers
{
    // Controller for managing user operations.
    //created with the help of resources availble on the internet
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;

        // Initializes a new instance of usercontroller
        public UsersController(IUserService userService) 
        {
            this.userService = userService;
        }

        // Handles user login.
        [HttpGet("login/{username}/{password}")]
        public ActionResult<Users> Login(string username, string password)
        {
            var user = userService.login(username);

            if (user == null)
            {
                return Ok($"User not found");
            }
            else if (user.Password == password && user.Activation == true)
            {
                return user;
            }
            else if (user.Password == password && user.Activation == false)
            {
                return Ok($"Activation Fail");
            }
            else
            {
                return Ok($"Unsuccessful");
            }

        }

        // Gets all users.
        [HttpGet]
        public ActionResult<List<Users>> Get()
        {
            return userService.Get();
        }


        // Gets a user by ID.
        [HttpGet("{id}")]
        public ActionResult<Users> Get(string id)
        {
            var user = userService.Get(id);

            if (user == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            return user;
        }

        // Creates a new user.
        [HttpPost]
        public ActionResult Post([FromBody] Users user)
        {
            var existingUser = userService.Create(user);

            if (existingUser == 0)
            {
                return NotFound($"existingUser");
            }
            else
            {
                return Ok($"Successful");
            }
        }

        // Updates an existing user.
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Users user)
        {

            var existingUser = userService.Get(id);

            if (existingUser == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            userService.Update(id, user);

            return NoContent();

        }

        // Deletes a user by ID.
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var user = userService.Get(id);

            if (user == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            userService.Remove(user.Id);

            return Ok($"User with Id = {id} deleted");
        }
    }
}

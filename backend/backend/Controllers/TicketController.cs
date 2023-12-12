/*
 * File: TicketController.cs
 * Description: Contains the the implementations of ticket API routes.
 * Author: GroupID - 110 (team - ticketForYou )
 * Created: - October 5, 2023
 * Modified: 
 *       October 7, 2023
 *      
 */

using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    // Controller for managing ticket operations.
    //created with the help of resources availble on the internet
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService ticketService;

        // Initializes a new instance of ticketController
        public TicketController(ITicketService ticketService)
        {
            this.ticketService = ticketService;
        }

        // Gets tickets for a specific user based on user ID.
        [HttpGet("user/{id}")]
        public ActionResult<List<Ticket>> GetUser(string id)
        {
            var ticket = ticketService.GetUser(id);

            if (ticket == null)
            {
                return NotFound($"Ticket not found");
            }

            return ticket;
        }

        // Gets all tickets.
        [HttpGet]
        public ActionResult<List<Ticket>> Get()
        {
            return ticketService.Get();
        }

        // Gets a ticket by ID.
        [HttpGet("{id}")]
        public ActionResult<Ticket> Get(string id)
        {
            var ticket = ticketService.Get(id);

            if (ticket == null)
            {
                return NotFound($"Ticket with Id = {id} not found");
            }

            return ticket;
        }

        // Creates a new ticket.
        [HttpPost]
        public ActionResult Post([FromBody] Ticket ticket)
        {
            var existingTicket = ticketService.Create(ticket);

            if (existingTicket == 0)
            {
                return NotFound($"existingTicket");
            }
            else
            {
                return Ok($"Successful");
            }
        }

        // Updates an existing ticket.
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Ticket ticket)
        {

            var existingTicket = ticketService.Get(id);

            if (existingTicket == null)
            {
                return NotFound($"Ticket with Id = {id} not found");
            }

            ticketService.Update(id, ticket);

            return Ok($"Successful");

        }

        // Deletes a ticket 
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var ticket = ticketService.Get(id);

            if (ticket == null)
            {
                return NotFound($"Ticket with Id = {id} not found");
            }

            ticketService.Remove(ticket.Id);

            return Ok($"Ticket with Id = {id} deleted");
        }
    }
}

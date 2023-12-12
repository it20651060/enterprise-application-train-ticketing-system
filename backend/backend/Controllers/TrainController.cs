/*
 * File: TrainController.cs
 * Description: Contains the the implementations of train API routes.
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
    // Controller for managing train operations.
    //created with the help of resources availble on the internet
    [Route("api/[controller]")]
    [ApiController]
    public class TrainController : ControllerBase
    {
        private readonly ITrainService trainService;

        // Initializes a new instance of trainController
        public TrainController(ITrainService trainService)
        {
            this.trainService = trainService;
        }

        // Gets all trains.
        [HttpGet]
        public ActionResult<List<Train>> Get()
        {
            return trainService.Get();
        }

        // Gets active trains.
        [HttpGet("active")]
        public ActionResult<List<Train>> GetActive()
        {
            return trainService.GetActive();
        }

        // Gets a train by ID.
        [HttpGet("{id}")]
        public ActionResult<Train> Get(string id)
        {
            var train = trainService.Get(id);

            if (train == null)
            {
                return NotFound($"Train with Id = {id} not found");
            }

            return train;
        }

        // Creates a new train.
        [HttpPost]
        public ActionResult Post([FromBody] Train train)
        {
            var existingTrain = trainService.Create(train);

            if (existingTrain == 0)
            {
                return NotFound($"existingTrain");
            }
            else
            {
                return Ok($"Successful");
            }
        }

        // Updates an existing train.
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Train train)
        {

            var existingTrain = trainService.Get(id);

            if (existingTrain == null)
            {
                return NotFound($"Train with Id = {id} not found");
            }

            trainService.Update(id, train);

            return Ok($"Successful");

        }

        // Deletes a train by ID.
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var train = trainService.Get(id);

            if (train == null)
            {
                return NotFound($"Train not found");
            }

            if (trainService.Ticket(train.Id) == 0)
            {
                return Ok($"Ticket already book");
            }
            else
            {

                trainService.Remove(train.Id);

                return Ok($"Train deleted");
            }
        }
    }
}

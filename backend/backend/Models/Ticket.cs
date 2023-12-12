/*
 * File: Ticket.cs
 * Description: Contains the implementation of ticket entity.
 * Author: GroupID - 110 (team - ticketForYou )
 * Created: - October 5, 2023
 * Modified: 
 *       October 7, 2023
 *      
 */


using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    /// Represents a ticket entity.
    [BsonIgnoreExtraElements]
    public class Ticket
    {
        //Gets or sets the unique identifier for the ticket.
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        // Gets or sets the ID of the train associated with the ticket.
        [BsonElement("trainId")]
        [Required(ErrorMessage = "Train Required")]
        public string TrainId { get; set; } = String.Empty;

        // Gets or sets the date of the ticket.
        [BsonElement("date")]
        [Required(ErrorMessage = "Date Required")]
        public string Date { get; set; } = String.Empty;

        // Gets or sets the time of the ticket.
        [BsonElement("time")]
        [Required(ErrorMessage = "Time Required")]
        public string Time { get; set; } = String.Empty;

        // Gets or sets the starting station of the journey.
        [BsonElement("start")]
        [Required(ErrorMessage = "Start Station Required")]
        public string Start { get; set; } = String.Empty;

        [BsonElement("end")]
        [Required(ErrorMessage = "End Station Required")]
        public string End { get; set; } = String.Empty;

        // Gets or sets the price of the ticket.
        [BsonElement("price")]
        [Required(ErrorMessage = "Price Required")]
        public double Price { get; set; }

        // Gets or sets the number of tickets purchased.
        [BsonElement("noOfTicket")]
        [Required(ErrorMessage = "No Of Ticket Required")]
        public int NoOfTicket { get; set; }

        // Gets or sets the user ID associated with the ticket.
        [BsonElement("userId")]
        [Required(ErrorMessage = "User Id Required")]
        public string UserId { get; set; } = String.Empty;

        // Gets or sets the total price for the tickets purchased.
        [BsonElement("total")]
        [Required(ErrorMessage = "Total Required")]
        public double Total { get; set; }

    }
}

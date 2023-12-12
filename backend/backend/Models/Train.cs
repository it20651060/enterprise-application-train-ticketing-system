/*
 * File: Train.cs
 * Description: Contains the implementation of train entity.
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
    // Represents a train entity.
    [BsonIgnoreExtraElements]
    public class Train
    {
        // Gets or sets the unique identifier for the train.
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        // Gets or sets the number of the train.
        [BsonElement("tNumber")]
        [Required(ErrorMessage = "Train Number Required")]
        public string TNumber { get; set; } = String.Empty;

        // Gets or sets the date of the train schedule.
        [BsonElement("date")]
        [Required(ErrorMessage = "Date Required")]
        public string Date { get; set; } = String.Empty;

        // Gets or sets the departure time of the train.
        [BsonElement("time")]
        [Required(ErrorMessage = "Time Required")]
        public string Time { get; set; } = String.Empty;

        // Gets or sets the starting station of the train journey.
        [BsonElement("start")]
        [Required(ErrorMessage = "Start Station Required")]
        public string Start { get; set; } = String.Empty;

        // Gets or sets the ending station of the train journey.
        [BsonElement("end")]
        [Required(ErrorMessage = "End Station Required")]
        public string End { get; set; } = String.Empty;

        // Gets or sets the price of the train ticket.
        [BsonElement("price")]
        [Required(ErrorMessage = "Price Required")]
        public double Price { get; set; }

        // Gets or sets a value indicating whether the train is canceled or not.
        [BsonElement("cancel")]
        [Required(ErrorMessage = "Cancel Required")]
        public bool Cancel { get; set; }
    }
}

/*
 * File: Users.cs
 * Description: Contains the implementation of user entity.
 * Author: GroupID - 110 (team - ticketForYou )
 * Created: - October 5, 2023
 * Modified: 
 *       October 7, 2023
 *      
 */

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    // Represents a user entity.
    [BsonIgnoreExtraElements]
    public class Users
    {
        // Gets or sets the unique identifier for the user.
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        // Gets or sets the first name of the user.
        [BsonElement("fname")]
        [Required(ErrorMessage = "First Name Required")]
        public string Fname { get; set; } = String.Empty;

        // Gets or sets the last name of the user.
        [BsonElement("lname")]
        [Required(ErrorMessage = "Last Name Required")]
        public string Lname { get; set; } = String.Empty;

        // Gets or sets the National Identity Card (NIC) number of the user.
        [BsonElement("nic")]
        [BsonRequired]
        [Required(ErrorMessage = "NIC Required")]
        public string Nic { get; set; } = String.Empty;

        // Gets or sets the email address of the user.
        [BsonElement("email")]
        [Required(ErrorMessage = "Email Required")]
        public string Email { get; set; } = String.Empty;

        // Gets or sets the password of the user.
        [BsonElement("password")]
        [Required(ErrorMessage = "Password Required")]
        public string Password { get; set; } = String.Empty;

        // Gets or sets the privilege level of the user.
        [BsonElement("privilege")]
        public string Privilege { get; set; } = String.Empty;

        // Gets or sets a value indicating whether the user's account is activated.
        [BsonElement("activation")]
        public bool Activation { get; set; }

    }
}

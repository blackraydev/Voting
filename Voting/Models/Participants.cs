using System.ComponentModel.DataAnnotations;

namespace Voting.Models {
    public class Participants {
        [Key]
        public int Id { get; set; }
        public int VotingId { get; set; }
        public int StudentId { get; set; }
        public string AssignDate { get; set; }
    }
}
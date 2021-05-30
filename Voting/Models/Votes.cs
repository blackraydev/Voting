using System.ComponentModel.DataAnnotations;

namespace Voting.Models {
    public class Votes {
        [Key]
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int ParticipantId { get; set; }
        public int VotingId { get; set; }
        public int CriteriaId { get; set; }
        public int Mark { get; set; }
        public string VoteDate { get; set; }
        public byte Deleted { get; set; }
    }
}
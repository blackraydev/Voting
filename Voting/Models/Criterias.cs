using System.ComponentModel.DataAnnotations;

namespace Voting.Models {
    public class Criterias {
        [Key]
        public int Id { get; set; }
        public int VotingId { get; set; }
        public string Name { get; set; }
    }
}
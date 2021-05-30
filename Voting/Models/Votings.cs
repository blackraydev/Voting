using System.ComponentModel.DataAnnotations;

namespace Voting.Models {
    public class Votings {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
using System.Linq;
using Voting.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Voting.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class VotesController : Controller {
        private readonly ILogger<VotesController> _logger;
        public AppDbContext _context;
        
        public VotesController(ILogger<VotesController> logger, AppDbContext context) {
            _logger = logger;
            _context = context;
        }
        
        [HttpGet("")]
        public IActionResult GetVotes() {
            var votes = _context.Votes.ToList();
            return Ok(votes);
        }
        
        [HttpPost("create")]
        public IActionResult CreateVote(Votes vote) {
            _context.Votes.Add(vote);
            _context.SaveChanges();
            
            return Ok(vote);
        }
        
        [HttpPost("edit")]
        public IActionResult EditVote(Votes editedVote) {
            var targetVote = _context.Votes.FirstOrDefault(vote => vote.Id == editedVote.Id);

            _context.Votes.Remove(targetVote);
            _context.Votes.Add(editedVote);
            _context.SaveChanges();

            return Ok(editedVote);
        }
    }
}
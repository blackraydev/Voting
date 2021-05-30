using System.Linq;
using Voting.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Voting.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class VotingsController : Controller {
        private readonly ILogger<VotingsController> _logger;
        public AppDbContext _context;
        
        public VotingsController(ILogger<VotingsController> logger, AppDbContext context) {
            _logger = logger;
            _context = context;
        }
        
        [HttpGet("")]
        public IActionResult GetVotings() {
            var votings = _context.Votings.ToList();
            return Ok(votings);
        }
        
        [HttpPost("create")]
        public IActionResult CreateVoting(Votings voting) {
            _context.Votings.Add(voting);
            _context.SaveChanges();
            
            return Ok(voting);
        }
        
        [HttpPost("edit")]
        public IActionResult EditVoting(Votings editedVoting) {
            var targetVoting = _context.Votings.FirstOrDefault(vtng => vtng.Id == editedVoting.Id);

            _context.Votings.Remove(targetVoting);
            _context.Votings.Add(editedVoting);
            _context.SaveChanges();

            return Ok(editedVoting);
        }
        
        [HttpDelete("{id}")]
        public IActionResult DeleteVoting(int id) {
            var deletedVoting = _context.Votings.FirstOrDefault(vtng => vtng.Id == id);
            
            _context.Votings.Remove(deletedVoting);
            _context.SaveChanges();

            return Ok(deletedVoting);
        }
    }
}
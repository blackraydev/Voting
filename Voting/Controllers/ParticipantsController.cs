using System.Collections.Generic;
using System.Linq;
using Voting.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Voting.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class ParticipantsController : Controller {
        private readonly ILogger<ParticipantsController> _logger;
        public AppDbContext _context;
        
        public ParticipantsController(ILogger<ParticipantsController> logger, AppDbContext context) {
            _logger = logger;
            _context = context;
        }
        
        [HttpGet("{votingId}")]
        public IActionResult GetParticipants(int votingId) {
            var participants = _context.Participants.ToList();
            List<Participants> targetParticipants = new List<Participants>();

            foreach (var participant in participants) {
                if (participant.VotingId == votingId) {
                    targetParticipants.Add(participant);
                }
            }
            
            return Ok(targetParticipants);
        }
        
        [HttpPost("create")]
        public IActionResult CreateParticipant(Participants participant) {
            _context.Participants.Add(participant);
            _context.SaveChanges();
            
            return Ok(participant);
        }
        
        [HttpPost("delete")]
        public IActionResult DeleteParticipant(Participants participant) {
            var deletedParticipant = _context.Participants.FirstOrDefault(prtcpnt => 
                prtcpnt.VotingId == participant.VotingId && prtcpnt.StudentId == participant.StudentId
            );
            
            _context.Participants.Remove(deletedParticipant);
            _context.SaveChanges();

            return Ok(deletedParticipant);
        }
    }
}
using System.Linq;
using Voting.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Voting.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class CriteriasController : Controller {
        private readonly ILogger<CriteriasController> _logger;
        public AppDbContext _context;
        
        public CriteriasController(ILogger<CriteriasController> logger, AppDbContext context) {
            _logger = logger;
            _context = context;
        }
        
        [HttpGet("")]
        public IActionResult GetCriterias() {
            var criterias = _context.Criterias.ToList();
            return Ok(criterias);
        }
        
        [HttpPost("create")]
        public IActionResult CreateCriteria(Criterias criteria) {
            _context.Criterias.Add(criteria);
            _context.SaveChanges();
            
            return Ok(criteria);
        }
        
        [HttpPost("edit")]
        public IActionResult EditCriteria(Criterias editedCriteria) {
            var targetCriteria = _context.Criterias.FirstOrDefault(crtr => crtr.Id == editedCriteria.Id);

            _context.Criterias.Remove(targetCriteria);
            _context.Criterias.Add(editedCriteria);
            _context.SaveChanges();

            return Ok(editedCriteria);
        }
        
        [HttpDelete("{id}")]
        public IActionResult DeleteCriteria(int id) {
            var deletedCriteria = _context.Criterias.FirstOrDefault(crtr => crtr.Id == id);
            
            _context.Criterias.Remove(deletedCriteria);
            _context.SaveChanges();

            return Ok(deletedCriteria);
        }
    }
}
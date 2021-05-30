using System.Linq;
using Voting.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Voting.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller {
        private readonly ILogger<UsersController> _logger;
        public AppDbContext _context;
        
        public UsersController(ILogger<UsersController> logger, AppDbContext context) {
            _logger = logger;
            _context = context;
        }
        
        [HttpGet("")]
        public IActionResult GetUsers() {
            var users = _context.Users.ToList();
            return Ok(users);
        }
        
        [HttpPost("create")]
        public IActionResult CreateUser(Users user) {
            _context.Users.Add(user);
            _context.SaveChanges();
            
            return Ok(user);
        }
        
        [HttpPost("edit")]
        public IActionResult EditUser(Users editedUser) {
            var targetUser = _context.Users.FirstOrDefault(usr => usr.Id == editedUser.Id);

            _context.Users.Remove(targetUser);
            _context.Users.Add(editedUser);
            _context.SaveChanges();

            return Ok(editedUser);
        }
        
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id) {
            var deletedUser = _context.Users.FirstOrDefault(usr => usr.Id == id);
            
            _context.Users.Remove(deletedUser);
            _context.SaveChanges();

            return Ok(deletedUser);
        }
    }
}
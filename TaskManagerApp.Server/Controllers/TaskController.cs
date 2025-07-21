using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TaskManagerApp.Server.Data;
using TaskManagerApp.Server.Models;

namespace TaskManagerApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {

        public ApplicationDbContext _db;
        public TaskController(ApplicationDbContext db) => _db = db;


        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var tasks = await _db.TaskItems.ToListAsync();
            return Ok(tasks);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id) =>
            await _db.TaskItems.FindAsync(id) is { } item ? Ok(item) : NotFound();


        [HttpPost]
        public async Task<IActionResult> Post(TaskItem item)
        {
            _db.TaskItems.Add(item);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTask), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, TaskItem item)
        {
            if (item.Id != id) return BadRequest("Task ID mismatch");

            _db.Entry(item).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _db.TaskItems.FindAsync(id);
            if (item is null) return NotFound();

            _db.TaskItems.Remove(item);
            await _db.SaveChangesAsync();
            return NoContent();

        }

    }
}



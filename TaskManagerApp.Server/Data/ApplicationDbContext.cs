using Microsoft.EntityFrameworkCore;
using TaskManagerApp.Server.Models;

namespace TaskManagerApp.Server.Data
{
    public class ApplicationDbContext :DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<TaskItem> TaskItems => Set<TaskItem>();
    }
}

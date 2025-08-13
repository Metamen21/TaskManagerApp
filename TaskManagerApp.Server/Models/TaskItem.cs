namespace TaskManagerApp.Server.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public bool IsCompleted { get; set; } = false;
        public string Status { get; set; } = "Pending";  // Default value
        public string Priority { get; set; } = "Low";    // Default value
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

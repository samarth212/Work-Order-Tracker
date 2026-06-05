namespace backend.Models;

public class WorkOrder
{
    public int Id { get; set; }

    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Status { get; set; } = "";
    public string Priority { get; set; } = "";
    public string AssignedTo { get; set; } = "";
    public string CreatedBy { get; set; } = "";

    public DateTime CreatedAt { get; set; }
    public DateTime DueDate { get; set; }

    public List<WorkOrderActivity> Activities { get; set; } = new();
}

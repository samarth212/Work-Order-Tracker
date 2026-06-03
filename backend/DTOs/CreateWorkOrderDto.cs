namespace backend.DTOs;

public class CreateWorkOrderDto
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Status { get; set; } = "";
    public string Priority { get; set; } = "";
    public string AssignedTo { get; set; } = "";
    public string CreatedBy { get; set; } = "";
    public DateTime DueDate { get; set; }
}
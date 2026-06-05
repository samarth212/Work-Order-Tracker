namespace backend.Models;

public class WorkOrderActivity
{
    public int Id { get; set; }
    public int WorkOrderId { get; set; }
    public string Message { get; set; } = "";
    public string ChangedBy { get; set; } = "";
    public string FieldChanged { get; set; } = "";
    public string OldValue { get; set; } = "";
    public string NewValue { get; set; } = "";
    public DateTime CreatedAt { get; set; }

    public WorkOrder? WorkOrder { get; set; }
}

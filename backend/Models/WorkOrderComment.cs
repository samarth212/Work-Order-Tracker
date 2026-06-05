using System.Text.Json.Serialization;

namespace backend.Models;

public class WorkOrderComment
{
    public int Id { get; set; }
    public int WorkOrderId { get; set; }
    public string Author { get; set; } = "";
    public string Message { get; set; } = "";
    public DateTime CreatedAt { get; set; }

    [JsonIgnore]
    public WorkOrder? WorkOrder { get; set; }
}

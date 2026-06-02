using backend.Models;

namespace backend.Services;

public class WorkOrderService {

    private readonly List<WorkOrder> workOrders = new List<WorkOrder>
    {
        new WorkOrder
        {
            Id = 1,
            Title = "Fix login issue",
            Description = "Users are having trouble logging into the system.",
            Status = "Open",
            Priority = "High",
            AssignedTo = "Samarth",
            CreatedBy = "Manager",
            CreatedAt = new DateTime(2026, 5, 27),
            DueDate = new DateTime(2026, 6, 1),
        },
        new WorkOrder
        {
            Id = 2,
            Title = "Update dashboard table",
            Description = "Add filtering and sorting to the dashboard table.",
            Status = "In Progress",
            Priority = "Medium",
            AssignedTo = "Alex",
            CreatedBy = "Manager",
            CreatedAt = new DateTime(2026, 5, 26),
            DueDate = new DateTime(2026, 6, 3),
        },
        new WorkOrder
        {
            Id = 3,
            Title = "Clean old database records",
            Description = "Remove or archive old test records from the database.",
            Status = "Completed",
            Priority = "Low",
            AssignedTo = "Maya",
            CreatedBy = "Admin",
            CreatedAt = new DateTime(2026, 5, 25),
            DueDate = new DateTime(2026, 5, 30),
        },
        new WorkOrder
        {
            Id = 4,
            Title = "Repair printer connection",
            Description = "Office printer is not reachable from user laptops.",
            Status = "Open",
            Priority = "Urgent",
            AssignedTo = "Jordan",
            CreatedBy = "Admin",
            CreatedAt = new DateTime(2026, 5, 28),
            DueDate = new DateTime(2026, 5, 29),
        },
        new WorkOrder
        {
            Id = 5,
            Title = "Replace broken keyboard",
            Description = "Front desk keyboard has several unresponsive keys.",
            Status = "Completed",
            Priority = "Low",
            AssignedTo = "Taylor",
            CreatedBy = "Manager",
            CreatedAt = new DateTime(2026, 5, 24),
            DueDate = new DateTime(2026, 5, 27),
        },
        new WorkOrder
        {
            Id = 6,
            Title = "Investigate slow network",
            Description = "Users report slow file uploads in the main office.",
            Status = "In Progress",
            Priority = "High",
            AssignedTo = "Riley",
            CreatedBy = "Manager",
            CreatedAt = new DateTime(2026, 5, 29),
            DueDate = new DateTime(2026, 6, 4),
        },
    };

    public List<WorkOrder> GetAll(){
        return workOrders;
    }

    public WorkOrder? GetById(int id){
        return workOrders.FirstOrDefault(t => t.Id == id);
    }

    public WorkOrder Add(WorkOrder newWorkOrder){
        int nextId = workOrders.Count == 0 ? 1 : workOrders.Max(w => w.Id) + 1;

        WorkOrder workOrder = new WorkOrder
        {
            Id = nextId,
            Title = newWorkOrder.Title,
            Description = newWorkOrder.Description,
            Status = newWorkOrder.Status,
            Priority = newWorkOrder.Priority,
            AssignedTo = newWorkOrder.AssignedTo,
            CreatedBy = newWorkOrder.CreatedBy,
            CreatedAt = newWorkOrder.CreatedAt,
            DueDate = newWorkOrder.DueDate,
        };

        workOrders.Add(workOrder);

        return workOrder;
    }

    public WorkOrder? Update(int id, WorkOrder updatedWorkOrder){
        int i = workOrders.FindIndex(w => w.Id == id);

        if(i == -1){
            return null;
        }

        WorkOrder workOrder = new WorkOrder
        {
            Id = id,
            Title = updatedWorkOrder.Title,
            Description = updatedWorkOrder.Description,
            Status = updatedWorkOrder.Status,
            Priority = updatedWorkOrder.Priority,
            AssignedTo = updatedWorkOrder.AssignedTo,
            CreatedBy = updatedWorkOrder.CreatedBy,
            CreatedAt = updatedWorkOrder.CreatedAt,
            DueDate = updatedWorkOrder.DueDate,
        };
    
        workOrders[i] = workOrder;

        return workOrder;

    }

    public bool Delete(int id){
        WorkOrder? workOrder = GetById(id);

        if(workOrder == null){
            return false;
        }

        workOrders.Remove(workOrder);
        return true;
    }
}

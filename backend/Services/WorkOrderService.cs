using backend.Models;

namespace backend.Services;

public class WorkOrderService {

    private readonly List<WorkOrder> workOrders = new List<WorkOrder>
    {
    new(1, "Fix login issue", "Users are having trouble logging into the system.", "Open", "High", "Samarth", "Manager", "2026-05-27", "2026-06-01"),
    new(2, "Update dashboard table", "Add filtering and sorting to the dashboard table.", "In Progress", "Medium", "Alex", "Manager", "2026-05-26", "2026-06-03"),
    new(3, "Clean old database records", "Remove or archive old test records from the database.", "Completed", "Low", "Maya", "Admin", "2026-05-25", "2026-05-30"),
    new(4, "Repair printer connection", "Office printer is not reachable from user laptops.", "Open", "Urgent", "Jordan", "Admin", "2026-05-28", "2026-05-29"),
    new(5, "Replace broken keyboard", "Front desk keyboard has several unresponsive keys.", "Completed", "Low", "Taylor", "Manager", "2026-05-24", "2026-05-27"),
    new(6, "Investigate slow network", "Users report slow file uploads in the main office.", "In Progress", "High", "Riley", "Manager", "2026-05-29", "2026-06-04"),
    };

    public List<WorkOrder> GetAll(){
        return workOrders;
    }

    public WorkOrder? GetById(int id){
        return workOrders.FirstOrDefault(t => t.Id == id);
    }

    public WorkOrder Add(WorkOrder newWorkOrder){
        int nextId = workOrders.Count == 0 ? 1 : workOrders.Max(w => w.Id) + 1;

        WorkOrder workOrder = new WorkOrder(
            nextId,
            newWorkOrder.Title,
            newWorkOrder.Description,
            newWorkOrder.Status,
            newWorkOrder.Priority,
            newWorkOrder.AssignedTo,
            newWorkOrder.CreatedBy,
            newWorkOrder.CreatedAt,
            newWorkOrder.DueDate);

        workOrders.Add(workOrder);

        return workOrder;
    }

    public WorkOrder? Update(int id, WorkOrder updatedWorkOrder){
        int i = workOrders.FindIndex(w => w.Id == id);

        if(i == -1){
            return null;
        }

        WorkOrder workOrder = new WorkOrder(
        id,
        updatedWorkOrder.Title,
        updatedWorkOrder.Description,
        updatedWorkOrder.Status,
        updatedWorkOrder.Priority,
        updatedWorkOrder.AssignedTo,
        updatedWorkOrder.CreatedBy,
        updatedWorkOrder.CreatedAt,
        updatedWorkOrder.DueDate);
    
        workOrders[i] = workOrder;

        return workOrder;

    }

    public bool Delete(int id){
        WorkOrder? workOrder = GetById(id)

        if(workOrder == null){
            return false;
        }

        workOrders.Remove(workOrder);
        return true;
    }
}
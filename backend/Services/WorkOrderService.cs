using backend.Models;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class WorkOrderService {


/* mock data
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

*/

    private readonly AppDbContext context;

    public WorkOrderService(AppDbContext context)
    {
        this.context = context;
    }

    public List<WorkOrder> GetAll()
    {
        return context.WorkOrders.ToList();
    }

    public WorkOrder? GetById(int id)
    {
        return context.WorkOrders.Find(id);
    }

    public WorkOrder Add(WorkOrder newWorkOrder)
    {
        newWorkOrder.Id = 0;
        newWorkOrder.CreatedAt = DateTime.Now;

        context.WorkOrders.Add(newWorkOrder);
        context.SaveChanges();

        return newWorkOrder;
    }

    public WorkOrder? Update(int id, WorkOrder updatedWorkOrder)
    {
        WorkOrder? existingWorkOrder = context.WorkOrders.Find(id);

        if (existingWorkOrder == null)
        {
            return null;
        }

        if (existingWorkOrder.Status != updatedWorkOrder.Status)
        {
            AddActivity(id, $"Samarth changed status from {existingWorkOrder.Status} to {updatedWorkOrder.Status}");
        }

        if (existingWorkOrder.Priority != updatedWorkOrder.Priority)
        {
            AddActivity(id, $"Samarth updated priority from {existingWorkOrder.Priority} to {updatedWorkOrder.Priority}");
        }

        if (existingWorkOrder.AssignedTo != updatedWorkOrder.AssignedTo)
        {
            AddActivity(id, $"Samarth reassigned work order from {existingWorkOrder.AssignedTo} to {updatedWorkOrder.AssignedTo}");
        }

        existingWorkOrder.Title = updatedWorkOrder.Title;
        existingWorkOrder.Description = updatedWorkOrder.Description;
        existingWorkOrder.Status = updatedWorkOrder.Status;
        existingWorkOrder.Priority = updatedWorkOrder.Priority;
        existingWorkOrder.AssignedTo = updatedWorkOrder.AssignedTo;
        existingWorkOrder.CreatedBy = updatedWorkOrder.CreatedBy;
        existingWorkOrder.DueDate = updatedWorkOrder.DueDate;

        context.SaveChanges();

        return existingWorkOrder;
    }

    public List<WorkOrderActivity> GetActivities(int workOrderId)
    {
        return context.WorkOrderActivities
            .Where(activity => activity.WorkOrderId == workOrderId)
            .OrderByDescending(activity => activity.CreatedAt)
            .ToList();
    }

    public bool Delete(int id)
    {
        WorkOrder? workOrder = context.WorkOrders.Find(id);

        if (workOrder == null)
        {
            return false;
        }

        context.WorkOrders.Remove(workOrder);
        context.SaveChanges();

        return true;
    }

    private void AddActivity(int workOrderId, string message)
    {
        context.WorkOrderActivities.Add(new WorkOrderActivity
        {
            WorkOrderId = workOrderId,
            Message = message,
            CreatedAt = DateTime.Now,
        });
    }
}

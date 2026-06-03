using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using backend.DTOs;

namespace backend.Controllers;

[ApiController]
[Route("workorders")]
public class WorkOrdersController : ControllerBase 
{
    private readonly WorkOrderService workOrderService;

    public WorkOrdersController(WorkOrderService workOrderService)
    {
        this.workOrderService = workOrderService;
    }

    [HttpGet]
    public ActionResult<List<WorkOrder>> GetAllWorkOrders() {
        return Ok(workOrderService.GetAll());
    }

    [HttpGet("{id}")]
    public ActionResult<WorkOrder> GetWorkOrderById(int id){
        WorkOrder? workOrder = workOrderService.GetById(id);

        if (workOrder == null)
        {
            return NotFound();
        }

        return Ok(workOrder);
    }

    [HttpPost]
    public ActionResult<WorkOrder> AddWorkOrder(CreateWorkOrderDto newWorkOrderDto)
    {
        WorkOrder newWorkOrder = new WorkOrder
        {
            Title = newWorkOrderDto.Title,
            Description = newWorkOrderDto.Description,
            Status = newWorkOrderDto.Status,
            Priority = newWorkOrderDto.Priority,
            AssignedTo = newWorkOrderDto.AssignedTo,
            CreatedBy = newWorkOrderDto.CreatedBy,
            DueDate = newWorkOrderDto.DueDate
        };

        WorkOrder createdWorkOrder = workOrderService.Add(newWorkOrder);

        return Created($"/workorders/{createdWorkOrder.Id}", createdWorkOrder);
    }

    [HttpPut("{id}")]
    public ActionResult<WorkOrder> UpdateWorkOrder(int id, WorkOrder updatedWorkOrder)
    {
        WorkOrder? workOrder = workOrderService.Update(id, updatedWorkOrder);

        if (workOrder == null)
        {
            return NotFound();
        }

        return Ok(workOrder);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteWorkOrder(int id)
    {
        bool deleted = workOrderService.Delete(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}

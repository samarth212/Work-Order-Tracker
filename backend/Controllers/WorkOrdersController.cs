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

    [HttpGet("{id}/activities")]
    public ActionResult<List<WorkOrderActivity>> GetWorkOrderActivities(int id)
    {
        WorkOrder? workOrder = workOrderService.GetById(id);

        if (workOrder == null)
        {
            return NotFound();
        }

        return Ok(workOrderService.GetActivities(id));
    }

    [HttpGet("{id}/comments")]
    public ActionResult<List<WorkOrderComment>> GetWorkOrderComments(int id)
    {
        WorkOrder? workOrder = workOrderService.GetById(id);

        if (workOrder == null)
        {
            return NotFound();
        }

        return Ok(workOrderService.GetComments(id));
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

    [HttpPost("{id}/comments")]
    public ActionResult<WorkOrderComment> AddWorkOrderComment(int id, CreateWorkOrderCommentDto newCommentDto)
    {
        WorkOrderComment newComment = new WorkOrderComment
        {
            Author = newCommentDto.Author,
            Message = newCommentDto.Message
        };

        WorkOrderComment? createdComment = workOrderService.AddComment(id, newComment);

        if (createdComment == null)
        {
            return NotFound();
        }

        return Created($"/workorders/{id}/comments/{createdComment.Id}", createdComment);
    }

    [HttpPut("{id}")]
    public ActionResult<WorkOrder> UpdateWorkOrder(int id, CreateWorkOrderDto updatedWorkOrderDto)
    {
        WorkOrder updatedWorkOrder = new WorkOrder
        {
            Title = updatedWorkOrderDto.Title,
            Description = updatedWorkOrderDto.Description,
            Status = updatedWorkOrderDto.Status,
            Priority = updatedWorkOrderDto.Priority,
            AssignedTo = updatedWorkOrderDto.AssignedTo,
            CreatedBy = updatedWorkOrderDto.CreatedBy,
            DueDate = updatedWorkOrderDto.DueDate
        };

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

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkOrder } from '../../models/work-order';
import { WorkOrderService } from '../../services/work-order';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-work-order-form',
  imports: [RouterLink, FormsModule],
  templateUrl: './work-order-form.html',
  styleUrl: './work-order-form.css',
})
export class WorkOrderForm {
  constructor(private workOrderService: WorkOrderService) {}

  priorities = ['Low', 'Medium', 'High', 'Urgent'] as const;

  newWorkOrder: Omit<WorkOrder, 'id'> = this.createEmptyWorkOrder();
  submittedWorkOrder?: WorkOrder;

  submitted = false;
  editingSubmittedWorkOrder = false;

  onSubmit() {
    if (this.editingSubmittedWorkOrder && this.submittedWorkOrder) {
      this.submittedWorkOrder =
        this.workOrderService.updateWorkOrder(this.submittedWorkOrder.id, this.newWorkOrder) ??
        this.submittedWorkOrder;
    } else {
      this.submittedWorkOrder = this.workOrderService.addWorkOrder(this.newWorkOrder);
    }

    this.editingSubmittedWorkOrder = false;
    this.submitted = true;
  }

  addAnother() {
    this.newWorkOrder = this.createEmptyWorkOrder();
    this.editingSubmittedWorkOrder = false;
    this.submitted = false;
  }

  editSubmittedWorkOrder() {
    if (!this.submittedWorkOrder) {
      return;
    }

    this.newWorkOrder = {
      title: this.submittedWorkOrder.title,
      description: this.submittedWorkOrder.description,
      status: this.submittedWorkOrder.status,
      priority: this.submittedWorkOrder.priority,
      assignedTo: this.submittedWorkOrder.assignedTo,
      createdBy: this.submittedWorkOrder.createdBy,
      createdAt: this.submittedWorkOrder.createdAt,
      dueDate: this.submittedWorkOrder.dueDate,
    };
    this.editingSubmittedWorkOrder = true;
    this.submitted = false;
  }

  private createEmptyWorkOrder(): Omit<WorkOrder, 'id'> {
    return {
      title: '',
      description: '',
      status: 'Open',
      priority: this.priorities[0],
      assignedTo: '',
      createdBy: '',
      createdAt: '',
      dueDate: '',
    };
  }
}

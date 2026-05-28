import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkOrder } from '../../models/work-order';
import { WorkOrderService } from '../../services/work-order';
import { FormsModule, NgForm } from '@angular/forms';

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

  onSubmit(form: NgForm) {
    this.submittedWorkOrder = this.workOrderService.addWorkOrder(this.newWorkOrder);
    this.submitted = true;
    this.newWorkOrder = this.createEmptyWorkOrder();
    form.resetForm(this.newWorkOrder);
  }

  addAnother() {
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

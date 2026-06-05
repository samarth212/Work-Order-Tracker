import { ChangeDetectorRef, Component } from '@angular/core';
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
  constructor(
    private workOrderService: WorkOrderService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  priorities = ['Low', 'Medium', 'High', 'Urgent'] as const;

  newWorkOrder: Omit<WorkOrder, 'id'> = this.createEmptyWorkOrder();
  submittedWorkOrder?: WorkOrder;

  submitted = false;
  editingSubmittedWorkOrder = false;
  submitting = false;
  errorMessage = '';

  onSubmit() {
    this.submitting = true;
    this.errorMessage = '';

    if (this.editingSubmittedWorkOrder && this.submittedWorkOrder) {
      this.workOrderService
        .updateWorkOrder(this.submittedWorkOrder.id, this.newWorkOrder)
        .subscribe({
          next: (workOrder) => {
            this.submittedWorkOrder = workOrder;
            this.editingSubmittedWorkOrder = false;
            this.submitted = true;
            this.submitting = false;
            this.changeDetectorRef.detectChanges();
          },
          error: (error) => {
            console.error('Error updating work order:', error);
            this.errorMessage = 'Unable to update work order.';
            this.submitting = false;
            this.changeDetectorRef.detectChanges();
          },
        });
    } else {
      this.workOrderService.addWorkOrder(this.newWorkOrder).subscribe({
        next: (workOrder) => {
          this.submittedWorkOrder = workOrder;
          this.editingSubmittedWorkOrder = false;
          this.submitted = true;
          this.submitting = false;
          this.changeDetectorRef.detectChanges();
        },
        error: (error) => {
          console.error('Error creating work order:', error);
          this.errorMessage = 'Unable to create work order.';
          this.submitting = false;
          this.changeDetectorRef.detectChanges();
        },
      });
    }
  }

  addAnother() {
    this.newWorkOrder = this.createEmptyWorkOrder();
    this.editingSubmittedWorkOrder = false;
    this.submitted = false;
    this.errorMessage = '';
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
    this.errorMessage = '';
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

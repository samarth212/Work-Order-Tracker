import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WorkOrder } from '../../models/work-order';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-work-order-form',
  imports: [RouterLink, FormsModule, JsonPipe],
  templateUrl: './work-order-form.html',
  styleUrl: './work-order-form.css',
})
export class WorkOrderForm {
  priorities = ['Low', 'Medium', 'High', 'Urgent'] as const;

  newWorkOrder: Partial<WorkOrder> = {
    title: '',
    description: '',
    status: 'Open',
    priority: this.priorities[0],
    assignedTo: '',
    createdBy: '',
    createdAt: '',
    dueDate: '',
  };

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkOrder } from '../../models/work-order';
import { WorkOrderService } from '../../services/work-order';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  workOrders: WorkOrder[] = [];

  constructor(private workOrderService: WorkOrderService) {
    this.workOrderService.getWorkOrders().subscribe((workOrders) => {
      this.workOrders = workOrders;
    });
  }

  get totalWorkOrders() {
    return this.workOrders.length;
  }

  get openWorkOrders() {
    return this.workOrders.filter((workOrder) => workOrder.status === 'Open').length;
  }

  get inProgressWorkOrders() {
    return this.workOrders.filter((workOrder) => workOrder.status === 'In Progress').length;
  }

  get completedWorkOrders() {
    return this.workOrders.filter((workOrder) => workOrder.status === 'Completed').length;
  }

  get highPriorityWorkOrders() {
    return this.workOrders.filter((workOrder) => workOrder.priority === 'High').length;
  }

  get urgentPriorityWorkOrders() {
    return this.workOrders.filter((workOrder) => workOrder.priority === 'Urgent').length;
  }
}

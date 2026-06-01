import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkOrder } from '../../models/work-order';
import { WorkOrderService } from '../../services/work-order';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  workOrders: WorkOrder[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private workOrderService: WorkOrderService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.errorMessage = '';

    this.workOrderService.getWorkOrders().subscribe({
      next: (workOrders) => {
        this.workOrders = workOrders;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Error loading work orders:', error);
        this.errorMessage = 'Unable to load work orders.';
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      },
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

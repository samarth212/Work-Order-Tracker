import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkOrder } from '../../models/work-order';
import { WorkOrderService } from '../../services/work-order';

@Component({
  selector: 'app-work-order-list',
  imports: [RouterLink],
  templateUrl: './work-order-list.html',
  styleUrl: './work-order-list.css',
})
export class WorkOrderList implements OnInit {
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
}

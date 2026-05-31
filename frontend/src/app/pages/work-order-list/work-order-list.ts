import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkOrder } from '../../models/work-order';
import { WorkOrderService } from '../../services/work-order';

@Component({
  selector: 'app-work-order-list',
  imports: [RouterLink],
  templateUrl: './work-order-list.html',
  styleUrl: './work-order-list.css',
})
export class WorkOrderList {
  workOrders: WorkOrder[] = [];
  constructor(private workOrderService: WorkOrderService) {
    this.workOrderService.getWorkOrders().subscribe((workOrders) => {
      this.workOrders = workOrders;
    });
  }
}

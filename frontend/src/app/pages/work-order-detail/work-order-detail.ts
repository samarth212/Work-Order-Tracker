import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WorkOrder } from '../../models/work-order';
import { WorkOrderService } from '../../services/work-order';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-work-order-detail',
  imports: [RouterLink, FormsModule],
  templateUrl: './work-order-detail.html',
  styleUrl: './work-order-detail.css',
})
export class WorkOrderDetail {
  workOrder: WorkOrder | undefined;
  statuses = ['Open', 'In Progress', 'Completed'] as const;

  constructor(
    private route: ActivatedRoute,
    private workOrderService: WorkOrderService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.workOrder = this.workOrderService.getWorkOrderById(id);
  }
}

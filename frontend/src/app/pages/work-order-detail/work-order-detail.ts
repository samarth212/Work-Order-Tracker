import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
export class WorkOrderDetail implements OnInit {
  workOrder: WorkOrder | undefined;
  loading = true;
  errorMessage = '';
  statuses = ['Open', 'In Progress', 'Completed'] as const;

  constructor(
    private route: ActivatedRoute,
    private workOrderService: WorkOrderService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      this.loading = true;
      this.errorMessage = '';
      this.workOrder = undefined;

      this.workOrderService.getWorkOrderById(id).subscribe({
        next: (workOrder) => {
          this.workOrder = workOrder;
          this.loading = false;
          this.changeDetectorRef.detectChanges();
        },
        error: (error) => {
          console.error('Error loading work order:', error);
          this.errorMessage = 'Work order not found.';
          this.loading = false;
          this.changeDetectorRef.detectChanges();
        },
      });
    });
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WorkOrder } from '../../models/work-order';
import { WorkOrderActivity } from '../../models/work-order-activity';
import { WorkOrderService } from '../../services/work-order';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-work-order-detail',
  imports: [RouterLink, FormsModule, DatePipe],
  templateUrl: './work-order-detail.html',
  styleUrl: './work-order-detail.css',
})
export class WorkOrderDetail implements OnInit {
  workOrder: WorkOrder | undefined;
  activities: WorkOrderActivity[] = [];
  editWorkOrder: Omit<WorkOrder, 'id'> | undefined;
  loading = true;
  errorMessage = '';
  actionErrorMessage = '';
  editing = false;
  saving = false;
  deleting = false;
  statuses = ['Open', 'Assigned', 'In Progress', 'Waiting on Parts', 'Completed', 'Closed'] as const;
  priorities = ['Low', 'Medium', 'High', 'Urgent'] as const;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workOrderService: WorkOrderService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      this.loading = true;
      this.errorMessage = '';
      this.actionErrorMessage = '';
      this.workOrder = undefined;
      this.activities = [];
      this.editWorkOrder = undefined;
      this.editing = false;

      this.workOrderService.getWorkOrderById(id).subscribe({
        next: (workOrder) => {
          this.workOrder = workOrder;
          this.loading = false;
          this.loadActivities(workOrder.id);
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

  startEdit(): void {
    if (!this.workOrder) {
      return;
    }

    this.editWorkOrder = {
      title: this.workOrder.title,
      description: this.workOrder.description,
      status: this.workOrder.status,
      priority: this.workOrder.priority,
      assignedTo: this.workOrder.assignedTo,
      createdBy: this.workOrder.createdBy,
      createdAt: this.workOrder.createdAt,
      dueDate: this.workOrder.dueDate,
    };
    this.actionErrorMessage = '';
    this.editing = true;
    this.changeDetectorRef.detectChanges();
  }

  cancelEdit(): void {
    this.editing = false;
    this.editWorkOrder = undefined;
    this.actionErrorMessage = '';
    this.changeDetectorRef.detectChanges();
  }

  saveEdit(): void {
    if (!this.workOrder || !this.editWorkOrder) {
      return;
    }

    this.saving = true;
    this.actionErrorMessage = '';

    this.workOrderService.updateWorkOrder(this.workOrder.id, this.editWorkOrder).subscribe({
      next: (workOrder) => {
        this.workOrder = workOrder;
        this.editWorkOrder = undefined;
        this.editing = false;
        this.saving = false;
        this.loadActivities(workOrder.id);
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Error updating work order:', error);
        this.actionErrorMessage = 'Unable to update work order.';
        this.saving = false;
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  private loadActivities(workOrderId: number): void {
    this.workOrderService.getWorkOrderActivities(workOrderId).subscribe({
      next: (activities) => {
        this.activities = activities;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Error loading work order activities:', error);
        this.activities = [];
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  deleteWorkOrder(): void {
    if (!this.workOrder) {
      return;
    }

    this.deleting = true;
    this.actionErrorMessage = '';

    this.workOrderService.deleteWorkOrder(this.workOrder.id).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error deleting work order:', error);
        this.actionErrorMessage = 'Unable to delete work order.';
        this.deleting = false;
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}

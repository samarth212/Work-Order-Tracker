import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WorkOrder } from '../../models/work-order';
import { WorkOrderActivity } from '../../models/work-order-activity';
import { WorkOrderComment } from '../../models/work-order-comment';
import { WorkOrderService } from '../../services/work-order';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-work-order-detail',
  imports: [RouterLink, FormsModule, DatePipe],
  templateUrl: './work-order-detail.html',
  styleUrl: './work-order-detail.css',
})
export class WorkOrderDetail implements OnInit {
  workOrder: WorkOrder | undefined;
  activities: WorkOrderActivity[] = [];
  comments: WorkOrderComment[] = [];
  editWorkOrder: Omit<WorkOrder, 'id'> | undefined;
  newComment = {
    author: 'Samarth',
    message: '',
  };
  loading = true;
  errorMessage = '';
  actionErrorMessage = '';
  commentErrorMessage = '';
  editing = false;
  saving = false;
  deleting = false;
  addingComment = false;
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
      this.commentErrorMessage = '';
      this.workOrder = undefined;
      this.activities = [];
      this.comments = [];
      this.editWorkOrder = undefined;
      this.newComment = {
        author: 'Samarth',
        message: '',
      };
      this.editing = false;

      this.workOrderService.getWorkOrderById(id).subscribe({
        next: (workOrder) => {
          this.workOrder = workOrder;
          this.loading = false;
          this.loadActivities(workOrder.id);
          this.loadComments(workOrder.id);
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

  private loadComments(workOrderId: number): void {
    this.commentErrorMessage = '';

    this.workOrderService.getWorkOrderComments(workOrderId).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Error loading work order comments:', error);
        this.comments = [];
        this.commentErrorMessage = 'Unable to load comments.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  addComment(): void {
    if (!this.workOrder || !this.newComment.message.trim()) {
      return;
    }

    const comment = {
      author: this.newComment.author.trim() || 'Samarth',
      message: this.newComment.message.trim(),
    };

    this.addingComment = true;
    this.commentErrorMessage = '';

    this.workOrderService.addWorkOrderComment(this.workOrder.id, comment).subscribe({
      next: () => {
        this.newComment.message = '';
        this.addingComment = false;
        this.loadComments(this.workOrder!.id);
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Error adding work order comment:', error);
        this.commentErrorMessage = 'Unable to add comment.';
        this.addingComment = false;
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

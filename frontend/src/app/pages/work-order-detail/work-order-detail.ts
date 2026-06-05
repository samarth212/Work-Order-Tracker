import { Component, OnInit, signal } from '@angular/core';
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
  workOrder = signal<WorkOrder | undefined>(undefined);
  activities = signal<WorkOrderActivity[]>([]);
  comments = signal<WorkOrderComment[]>([]);
  editWorkOrder: Omit<WorkOrder, 'id'> | undefined;
  newComment = {
    author: 'Samarth',
    message: '',
  };
  loading = signal(true);
  errorMessage = signal('');
  actionErrorMessage = signal('');
  commentErrorMessage = signal('');
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
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      this.loading.set(true);
      this.errorMessage.set('');
      this.actionErrorMessage.set('');
      this.commentErrorMessage.set('');
      this.workOrder.set(undefined);
      this.activities.set([]);
      this.comments.set([]);
      this.editWorkOrder = undefined;
      this.newComment = {
        author: 'Samarth',
        message: '',
      };
      this.editing = false;

      if (!Number.isFinite(id) || id <= 0) {
        this.errorMessage.set('Work order not found.');
        this.loading.set(false);
        return;
      }

      this.workOrderService.getWorkOrderById(id).subscribe({
        next: (workOrder) => {
          this.workOrder.set(workOrder);
          this.loading.set(false);
          this.loadActivities(workOrder.id);
          this.loadComments(workOrder.id);
        },
        error: (error) => {
          console.error('Error loading work order:', error);
          this.errorMessage.set('Work order not found.');
          this.loading.set(false);
        },
      });
    });
  }

  startEdit(): void {
    const workOrder = this.workOrder();

    if (!workOrder) {
      return;
    }

    this.editWorkOrder = {
      title: workOrder.title,
      description: workOrder.description,
      status: workOrder.status,
      priority: workOrder.priority,
      assignedTo: workOrder.assignedTo,
      createdBy: workOrder.createdBy,
      createdAt: workOrder.createdAt,
      dueDate: workOrder.dueDate,
    };
    this.actionErrorMessage.set('');
    this.editing = true;
  }

  cancelEdit(): void {
    this.editing = false;
    this.editWorkOrder = undefined;
    this.actionErrorMessage.set('');
  }

  saveEdit(): void {
    const workOrder = this.workOrder();

    if (!workOrder || !this.editWorkOrder) {
      return;
    }

    this.saving = true;
    this.actionErrorMessage.set('');

    this.workOrderService.updateWorkOrder(workOrder.id, this.editWorkOrder).subscribe({
      next: (workOrder) => {
        this.workOrder.set(workOrder);
        this.editWorkOrder = undefined;
        this.editing = false;
        this.saving = false;
        this.loadActivities(workOrder.id);
      },
      error: (error) => {
        console.error('Error updating work order:', error);
        this.actionErrorMessage.set('Unable to update work order.');
        this.saving = false;
      },
    });
  }

  private loadActivities(workOrderId: number): void {
    this.workOrderService.getWorkOrderActivities(workOrderId).subscribe({
      next: (activities) => {
        this.activities.set(activities);
      },
      error: (error) => {
        console.error('Error loading work order activities:', error);
        this.activities.set([]);
      },
    });
  }

  private loadComments(workOrderId: number): void {
    this.commentErrorMessage.set('');

    this.workOrderService.getWorkOrderComments(workOrderId).subscribe({
      next: (comments) => {
        this.comments.set(comments);
      },
      error: (error) => {
        console.error('Error loading work order comments:', error);
        this.comments.set([]);
        this.commentErrorMessage.set('Unable to load comments.');
      },
    });
  }

  addComment(): void {
    const workOrder = this.workOrder();

    if (!workOrder || !this.newComment.message.trim()) {
      return;
    }

    const comment = {
      author: this.newComment.author.trim() || 'Samarth',
      message: this.newComment.message.trim(),
    };

    this.addingComment = true;
    this.commentErrorMessage.set('');

    this.workOrderService.addWorkOrderComment(workOrder.id, comment).subscribe({
      next: () => {
        this.newComment.message = '';
        this.addingComment = false;
        this.loadComments(workOrder.id);
      },
      error: (error) => {
        console.error('Error adding work order comment:', error);
        this.commentErrorMessage.set('Unable to add comment.');
        this.addingComment = false;
      },
    });
  }

  deleteWorkOrder(): void {
    const workOrder = this.workOrder();

    if (!workOrder) {
      return;
    }

    this.deleting = true;
    this.actionErrorMessage.set('');

    this.workOrderService.deleteWorkOrder(workOrder.id).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error deleting work order:', error);
        this.actionErrorMessage.set('Unable to delete work order.');
        this.deleting = false;
      },
    });
  }
}

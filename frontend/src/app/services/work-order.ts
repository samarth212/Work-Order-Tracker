import { Injectable } from '@angular/core';
import { WorkOrder } from '../models/work-order';

@Injectable({
  providedIn: 'root',
})
export class WorkOrderService {
  // mock data
  private workOrders: WorkOrder[] = [
    {
      id: 1,
      title: 'Fix login issue',
      description: 'Users are having trouble logging into the system.',
      status: 'Open',
      priority: 'High',
      assignedTo: 'Samarth',
      createdBy: 'Manager',
      createdAt: '2026-05-27',
      dueDate: '2026-06-01',
    },
    {
      id: 2,
      title: 'Update dashboard table',
      description: 'Add filtering and sorting to the dashboard table.',
      status: 'In Progress',
      priority: 'Medium',
      assignedTo: 'Alex',
      createdBy: 'Manager',
      createdAt: '2026-05-26',
      dueDate: '2026-06-03',
    },
    {
      id: 3,
      title: 'Clean old database records',
      description: 'Remove or archive old test records from the database.',
      status: 'Completed',
      priority: 'Low',
      assignedTo: 'Maya',
      createdBy: 'Admin',
      createdAt: '2026-05-25',
      dueDate: '2026-05-30',
    },
  ];

  private newId = 4;

  getWorkOrders(): WorkOrder[] {
    return this.workOrders;
  }

  getWorkOrderById(id: number): WorkOrder | undefined {
    return this.workOrders.find((workOrder) => workOrder.id === id);
  }

  addWorkOrder(workOrder: Omit<WorkOrder, 'id'>): WorkOrder {
    const newWorkOrder: WorkOrder = {
      ...workOrder,
      id: this.newId,
    };

    this.newId++;
    this.workOrders.push(newWorkOrder);

    return newWorkOrder;
  }
}

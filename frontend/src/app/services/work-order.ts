import { Injectable } from '@angular/core';
import { WorkOrder } from '../models/work-order';
import { WorkOrderActivity } from '../models/work-order-activity';
import { WorkOrderComment } from '../models/work-order-comment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkOrderService {
  private apiUrl = 'http://localhost:5056/workorders';
  constructor(private http: HttpClient) {}

  getWorkOrders(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.apiUrl);
  }

  getWorkOrderById(id: number): Observable<WorkOrder> {
    return this.http.get<WorkOrder>(`${this.apiUrl}/${id}`);
  }

  getWorkOrderActivities(id: number): Observable<WorkOrderActivity[]> {
    return this.http.get<WorkOrderActivity[]>(`${this.apiUrl}/${id}/activities`);
  }

  getWorkOrderComments(id: number): Observable<WorkOrderComment[]> {
    return this.http.get<WorkOrderComment[]>(`${this.apiUrl}/${id}/comments`);
  }

  addWorkOrderComment(
    id: number,
    comment: Pick<WorkOrderComment, 'author' | 'message'>,
  ): Observable<WorkOrderComment> {
    return this.http.post<WorkOrderComment>(`${this.apiUrl}/${id}/comments`, comment);
  }

  addWorkOrder(workOrder: Omit<WorkOrder, 'id'>): Observable<WorkOrder> {
    return this.http.post<WorkOrder>(this.apiUrl, workOrder);
  }

  updateWorkOrder(id: number, workOrder: Omit<WorkOrder, 'id'>): Observable<WorkOrder> {
    return this.http.put<WorkOrder>(`${this.apiUrl}/${id}`, workOrder);
  }

  deleteWorkOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

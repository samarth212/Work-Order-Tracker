export interface WorkOrderComment {
  id: number;
  workOrderId: number;
  author: string;
  message: string;
  createdAt: string;
}

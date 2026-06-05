export interface WorkOrderActivity {
  id: number;
  workOrderId: number;
  message: string;
  changedBy: string;
  fieldChanged: string;
  oldValue: string;
  newValue: string;
  createdAt: string;
}

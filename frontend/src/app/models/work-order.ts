export interface WorkOrder {
  id: number;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  dueDate: string;
}

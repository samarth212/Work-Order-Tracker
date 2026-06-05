export interface WorkOrder {
  id: number;
  title: string;
  description: string;
  status: 'Open' | 'Assigned' | 'In Progress' | 'Waiting on Parts' | 'Completed' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  dueDate: string;
}

import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { WorkOrderDetail } from './pages/work-order-detail/work-order-detail';
import { WorkOrderForm } from './pages/work-order-form/work-order-form';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'workorders',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'workorders',
    component: Dashboard,
  },
  {
    path: 'workorders/new',
    component: WorkOrderForm,
  },
  {
    path: 'workorders/:id',
    component: WorkOrderDetail,
  },
];

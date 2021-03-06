import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../_shared';

const routes: Routes = [
  {
    path: 'event',
    loadChildren: () =>
      import('./modules/event-management/event-management.module').then(
        (m) => m.EventManagementModule
      ),
    canActivate: [AuthGuard],
    data: {
      claims: {
        all: 'view:event',
      },
    },
  },
  {
    path: 'ranking',
    loadChildren: () =>
      import('./modules/ranking-management/ranking-management.module').then(
        (m) => m.RankingManagementModule
      ),
    canActivate: [AuthGuard],
    data: {
      claims: {
        all: 'view:ranking',
      },
    },
  },
  {
    path: 'club',
    loadChildren: () =>
      import('./modules/club-management/club-management.module').then(
        (m) => m.ClubManagementModule
      ),
    canActivate: [AuthGuard],
    data: {
      claims: {
        all: 'view:club',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'app/_shared';
import { ClubRoutingModule } from './club-routing.module';
import { DetailClubComponent, OverviewClubsComponent } from './pages';
import { TeamOverviewComponent } from './pages/detail-club/components/team-overview/team-overview.component';

const materialModules = [
  FormsModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSortModule,
  MatTableModule,
  ReactiveFormsModule,
  MatIconModule,
  MatTabsModule,
  MatCardModule
];

@NgModule({
  declarations: [OverviewClubsComponent, DetailClubComponent, TeamOverviewComponent],
  imports: [SharedModule, ...materialModules, ClubRoutingModule],
})
export class ClubModule {}

import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

export enum SidenavStatus {
  OPENED = 'opened',
  DISABLED = 'disabled',
  CLOSED = 'closed',
}

@Component({
  selector: 'bba-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Comic Collector Dashboard';

  links = [
    { path: '/', icon: 'home', title: 'home' },
    { path: '/comics', icon: 'view_list', title: 'comics' },
    { path: '/collectors', icon: 'account_circle', title: 'collectors' },
  ];

  isAuthenticated$: Observable<boolean> = of(true);
  sidenavStatus = SidenavStatus.OPENED;
}

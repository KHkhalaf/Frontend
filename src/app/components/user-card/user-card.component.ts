import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() id?: number;
  @Input() first_name?: string;
  @Input() last_name?: string;
  @Input() avatar?: string;

  constructor(private router: Router) {}

  showUserDetails() {
    this.router.navigate(['user/', this.id]);
  }
}

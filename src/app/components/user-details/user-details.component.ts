import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user-config/modules/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  id?: number;
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private readonly location: Location,
    private userService: UserService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.user = this.userService.getUserById(this.id);
  }
  goBack() {
    this.location.back();
  }
}

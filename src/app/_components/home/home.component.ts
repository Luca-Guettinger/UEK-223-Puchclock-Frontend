import {Component, OnInit} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {User} from '../../_model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../css/detail-page-style.css']
})
export class HomeComponent implements OnInit {
  public user: User;


  constructor(private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.getMyself().subscribe(value => {
      this.user = value;
    });
  }
}

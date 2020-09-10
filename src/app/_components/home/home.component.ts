import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Entry} from '../../_model/Entry';
import {Category} from '../../_model/Category';
import {EntryService} from '../../_services/entry.service';
import {CategoryService} from '../../_services/category.service';
import {LoginService} from '../../_services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../_services/user.service';
import {User} from '../../_model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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

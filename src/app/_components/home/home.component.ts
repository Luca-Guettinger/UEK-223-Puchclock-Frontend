import {Component, OnInit} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {User} from '../../_model/User';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoginService} from '../../_services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../css/detail-page-style.css']
})
export class HomeComponent implements OnInit {
  public user: User;
  public newPw: string;
  updateUserGroup = new FormGroup({
    password: new FormControl(''),
    username: new FormControl('')
  }, Validators.required);

  constructor(private userService: UserService, private snackBar: MatSnackBar, private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.userService.getMyself().subscribe(value => {
      this.user = value;
    });
  }

  updateUser(f5: FormGroupDirective): void {
    this.userService.updateUser({
      password: this.newPw,
      username: this.user.username,
      id: this.user.id
    }).subscribe(value => {
      this.user.password = value.password;
      this.user.username = value.username;
      this.newPw = '';
      this.snackBar.open('Passwort geändert, bitte melden sie sich erneut an.', 'Schliessen', {duration: 2000});
      this.loginService.logoutAndRedirect();
    }, error => {
      this.snackBar.open('Fehler beim änderen des Passwortes...', 'Schliessen', {duration: 2000});
    });
  }
}

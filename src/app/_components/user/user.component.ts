import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {LoginService} from '../../_services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User} from '../../_model/User';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../css/detail-page-style.css']
})
export class UserComponent implements OnInit {
  group = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  }, Validators.required);
  public user: User;
  public users: User[];
  public newPw = '';
  updateUserGroup = new FormGroup({
    password: new FormControl('')
  }, Validators.required);

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.user = new User();
    this.userService.load().subscribe(value => {
      this.users = value;
    }, error => {
      if (error.status === 403) {
        this.snackBar.open('Du bist nicht angemeldet!', 'Close', {duration: 2000});
        this.loginService.logoutAndRedirect();
      }
    });
  }

  save(f: FormGroupDirective): void {
    this.userService.save(this.user).subscribe(value => {
      this.users.push(value);
      this.user = new User();
      this.snackBar.open('Benutzer erfolgreich gespeichert.', 'Schliessen', {duration: 2000});
    });
  }

  delete(user: User): void {
    this.userService.deleteUser(user.id).subscribe(value => {
      const index = this.users.indexOf(user, 0);
      if (index <= -1) {
        this.snackBar.open('Benutzer mit der ID ' + user.id + ' konnte intern nicht gefunden werden.', 'Schliessen', {duration: 2000});
        return;
      }
      this.users.splice(index, 1);
      this.snackBar.open('Benutzer mit der ID ' + user.id + ' wurde erfolgreich gelöscht!');
    }, error => {
      if (error.status === 403) {
        this.snackBar.open('Ein Benutzer kann nur gelöscht werden, wenn es keine Einträge mit diesem Benutzer gibt.');
      } else {
        this.snackBar.open('Benutzer mit der ID ' + user.id + ' konnte nicht gelöscht werden: ' + error.error.message);
      }
    });
  }

  updateUser(user: User, f5: FormGroupDirective): void {
    this.userService.updateUser({
      password: this.newPw,
      username: user.username,
      id: user.id
    }).subscribe(value => {
      user.password = value.password;
      this.newPw = '';
      this.snackBar.open('Passwort geändert.', 'Schliessen', {duration: 2000});
    }, error => {
      this.snackBar.open('Fehler beim änderen des Passwortes...', 'Schliessen', {duration: 2000});
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {User} from '../../_model/User';
import {LoginService} from '../../_services/login.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private service: LoginService, private snackbar: MatSnackBar) {
  }

  user = new User();

  group = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  }, Validators.required);

  ngOnInit(): void {
  }

  saveEntry(f: FormGroupDirective): void {
    this.service.login(this.user).subscribe(value => {
      console.log(value);
      const authorization = value.headers.get('Authorization');
      localStorage.setItem('token', authorization);
      this.router.navigateByUrl('home');
    }, error => {
      this.snackbar.open('Anmeldung Fehlgeschlagen', 'Schliessen', {duration: 2000});
    });
  }
}

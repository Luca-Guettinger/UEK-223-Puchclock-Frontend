import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, ValidatorFn, Validators} from '@angular/forms';
import {LoginService} from '../../_services/login.service';
import {User} from '../../_model/User';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../_services/user.service';

function isEqual(valueOne: string, valueTwo: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const notEqual = valueTwo === valueOne;
    return notEqual ? {isEqual: {value: control.value}} : null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../css/form-style.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService,
              private userService: UserService,
              private snackBar: MatSnackBar) {
  }

  message = '';
  user = new User();
  passwordRepeat = '';

  group = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    passwordRepeat: new FormControl('', [
      isEqual(this.user.password, this.passwordRepeat)
    ])
  }, Validators.required);

  ngOnInit(): void {
  }

  saveEntry(f: FormGroupDirective): void {
    if (this.user.password !== this.passwordRepeat) {
      return;
    }

    this.userService.save(this.user).subscribe(value => {
      this.router.navigateByUrl('/home');
    }, error => {
      this.snackBar.open('Registrierung Fehlgeschlagen', 'Schliessen', {duration: 2000});
    });
  }
}

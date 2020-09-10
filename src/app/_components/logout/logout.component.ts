import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../_services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['../css/form-style.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private service: LoginService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.service.logoutAndRedirect();
  }
}

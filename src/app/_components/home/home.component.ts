import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Entry} from '../../_model/Entry';
import {Category} from '../../_model/Category';
import {EntryService} from '../../_services/entry/entry.service';
import {CategoryService} from '../../_services/category/category.service';
import {LoginService} from '../../_services/login/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
  ) {
  }

  ngOnInit(): void {
  }
}

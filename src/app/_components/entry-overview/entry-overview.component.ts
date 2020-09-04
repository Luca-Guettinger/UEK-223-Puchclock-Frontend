import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Entry} from '../../_model/Entry';
import {Category} from '../../_model/Category';
import {EntryService} from '../../_services/entry/entry.service';
import {CategoryService} from '../../_services/category/category.service';
import {LoginService} from '../../_services/login/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-entry-overview',
  templateUrl: './entry-overview.component.html',
  styleUrls: ['./entry-overview.component.css']
})
export class EntryOverviewComponent implements OnInit {
  group = new FormGroup({
    checkIn: new FormControl(''),
    checkOut: new FormControl(''),
    categories: new FormControl('')
  }, Validators.required);
  public entry: Entry;
  public categories: Category[];
  entries: Entry[];

  constructor(
    private entryService: EntryService,
    private categoryService: CategoryService,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.entry = new Entry();
    this.categoryService.loadCategories().subscribe(value => {
      this.categories = value;
    }, error => {
      if (error.status === 403) {
        this.snackBar.open('Du bist nicht angemeldet!', 'Close', {duration: 2000});
        this.loginService.logoutAndRedirect();
      }
    });

    this.entryService.loadEntries().subscribe(value => {
      this.entries = value;
      this.loginService.redirectOnLoggedOut();
    }, error => {
      if (error.status === 403) {
        this.snackBar.open('Du bist nicht angemeldet!', 'Schliessen', {duration: 2000});
        this.loginService.logoutAndRedirect();
      }
    });
  }

  save(f: FormGroupDirective): void {
    this.entryService.saveEntry(this.entry).subscribe(value => {
      this.entries.push(value);
      this.entry = new Entry();
      this.snackBar.open('Zeiteintrag erfolgreich gespeichert.', 'Schliessen', {duration: 2000});
    });
  }
}

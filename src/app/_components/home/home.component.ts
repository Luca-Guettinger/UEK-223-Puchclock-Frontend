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
  entryGroup = new FormGroup({
    checkIn: new FormControl(''),
    checkOut: new FormControl(''),
    categories: new FormControl('')
  }, Validators.required);
  categoryGroup = new FormGroup({
    name: new FormControl('')
  }, Validators.required);
  public entry: Entry;
  public category: Category;
  public categories: Category[];
  public entries: Entry[];

  constructor(
    private entryService: EntryService,
    private categoryService: CategoryService,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.entry = new Entry();
    this.category = new Category();
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

  saveEntry(f: FormGroupDirective): void {
    this.entryService.saveEntry(this.entry).subscribe(value => {
      this.entries.push(value);
      this.entry = new Entry();
      this.snackBar.open('Zeiteintrag erfolgreich gespeichert.', 'Schliessen', {duration: 2000});
    });
  }

  saveCategory(f: FormGroupDirective): void {
    this.categoryService.saveCategory(this.category).subscribe(value => {
      this.categories.push(value);
      this.category = new Category();
      this.snackBar.open('Kategorie erfolgreich gespeichert.', 'Schliessen', {duration: 2000});
    });
  }

  deleteEntry(entry: Entry): void {
    this.entryService.deleteEntry(entry.id).subscribe(value => {
      const index = this.entries.indexOf(entry, 0);
      if (index <= -1) {
        this.snackBar.open('Eintrag mit der ID ' + entry.id + ' konnte intern nicht gefunden werden.', 'Schliessen', {duration: 2000});
        return;
      }
      this.entries.splice(index, 1);
      this.snackBar.open('Eintrag mit der ID ' + entry.id + ' wurde erfolgreich gelöscht!');
    }, error => {
      this.snackBar.open('Eintrag mit der ID ' + entry.id + ' konnte nicht gelöscht werden...' + error.error.message);
    });
  }

  deleteCategory(category: Category): void {
    this.categoryService.deleteCategory(category.id).subscribe(value => {
      const index = this.categories.indexOf(category, 0);
      if (index <= -1) {
        this.snackBar.open('Kategorie mit der ID ' + category.id + ' konnte intern nicht gefunden werden.', 'Schliessen', {duration: 2000});
        return;
      }
      this.categories.splice(index, 1);
      this.snackBar.open('Kategorie mit der ID ' + category.id + ' wurde erfolgreich gelöscht!');
    }, error => {
      if (error.status === 403) {
        this.snackBar.open('Eine Kategorie kann nur gelöscht werden, wenn es keine Entries mit der Kategorie gibt.');
      } else {
        this.snackBar.open('Kategorie mit der ID ' + category.id + ' konnte nicht gelöscht werden: ' + error.error.message);
      }
    });
  }
}

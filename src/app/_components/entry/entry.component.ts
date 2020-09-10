import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Entry} from '../../_model/Entry';
import {Category} from '../../_model/Category';
import {EntryService} from '../../_services/entry.service';
import {CategoryService} from '../../_services/category.service';
import {LoginService} from '../../_services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '../../_model/Location';
import {LocationService} from '../../_services/location.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['../css/detail-page-style.css']
})
export class EntryComponent implements OnInit {

  entryGroup = new FormGroup({
    checkIn: new FormControl(''),
    checkOut: new FormControl(''),
    categories: new FormControl(''),
    location: new FormControl('')
  }, Validators.required);

  public entry: Entry;
  public categories: Category[];
  public entries: Entry[];
  public locations: Location[];

  constructor(
    private entryService: EntryService,
    private categoryService: CategoryService,
    private loginService: LoginService,
    private locationService: LocationService,
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
    }, error => {
      if (error.status === 403) {
        this.snackBar.open('Du bist nicht angemeldet!', 'Schliessen', {duration: 2000});
        this.loginService.logoutAndRedirect();
      }
    });

    this.locationService.load().subscribe(value => {
      this.locations = value;
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
}

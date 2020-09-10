import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Category} from '../../_model/Category';
import {LoginService} from '../../_services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LocationService} from '../../_services/location.service';
import {Location} from '../../_model/Location';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  locationGroup = new FormGroup({
    streetName: new FormControl(''),
    streetNumber: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl('')
  }, Validators.required);
  public location: Location;
  public locations: Location[];

  constructor(
    private locationService: LocationService,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.location = new Location();
    this.locationService.load().subscribe(value => {
      this.locations = value;
    }, error => {
      if (error.status === 403) {
        this.snackBar.open('Du bist nicht angemeldet!', 'Close', {duration: 2000});
        this.loginService.logoutAndRedirect();
      }
    });
  }

  save(f: FormGroupDirective): void {
    this.locationService.save(this.location).subscribe(value => {
      this.locations.push(value);
      this.location = new Location();
      this.snackBar.open('Standort erfolgreich gespeichert.', 'Schliessen', {duration: 2000});
    });
  }

  delete(location: Location): void {
    this.locationService.deleteLocation(location.id).subscribe(value => {
      const index = this.locations.indexOf(location, 0);
      if (index <= -1) {
        this.snackBar.open('Standort mit der ID ' + location.id + ' konnte intern nicht gefunden werden.', 'Schliessen', {duration: 2000});
        return;
      }
      this.locations.splice(index, 1);
      this.snackBar.open('Standort mit der ID ' + location.id + ' wurde erfolgreich gelöscht!');
    }, error => {
      if (error.status === 403) {
        this.snackBar.open('Ein Standort kann nur gelöscht werden, wenn es keine Einträge mit diesem Standort gibt.');
      } else {
        this.snackBar.open('Standort mit der ID ' + location.id + ' konnte nicht gelöscht werden: ' + error.error.message);
      }
    });
  }
}

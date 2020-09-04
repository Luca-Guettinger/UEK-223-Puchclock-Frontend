import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Entry} from '../../_model/Entry';
import {Category} from '../../_model/Category';
import {EntryService} from '../../_services/entry/entry.service';
import {CategoryService} from '../../_services/category/category.service';

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
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.entry = new Entry();
    this.categoryService.loadCategories().subscribe(value => {
      this.categories = value;
    });

    this.entryService.loadEntries().subscribe(value => {
      this.entries = value;
    });
  }

  save(f: FormGroupDirective): void {
    this.entryService.saveEntry(this.entry).subscribe(value => {
      this.entries.push(value);
      this.entry = new Entry();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Category } from '../../_model/Category';
import { CategoryService } from '../../_services/category.service';
import { LoginService } from '../../_services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryGroup = new FormGroup({
    name: new FormControl('')
  }, Validators.required);
  public category: Category;
  public categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.category = new Category();
    this.categoryService.loadCategories().subscribe(value => {
      this.categories = value;
    }, error => {
      if (error.status === 403) {
        this.snackBar.open('Du bist nicht angemeldet!', 'Close', {duration: 2000});
        this.loginService.logoutAndRedirect();
      }
    });
  }

  saveCategory(f: FormGroupDirective): void {
    this.categoryService.saveCategory(this.category).subscribe(value => {
      this.categories.push(value);
      this.category = new Category();
      this.snackBar.open('Kategorie erfolgreich gespeichert.', 'Schliessen', {duration: 2000});
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
        this.snackBar.open('Eine Kategorie kann nur gelöscht werden, wenn es keine Einträge mit der Kategorie gibt.');
      } else {
        this.snackBar.open('Kategorie mit der ID ' + category.id + ' konnte nicht gelöscht werden: ' + error.error.message);
      }
    });
  }
}

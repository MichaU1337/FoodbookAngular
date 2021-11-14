import {Component, OnInit} from '@angular/core';
import {Recipe} from "./recipe";
import {RecipeService} from "./recipe.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {RecipeListService} from "./recipeList.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Foodbook';
  public recipes: Recipe[];
  public savedRecipes: Recipe[];
  public editRecipe: Recipe;
  public deleteRecipe: Recipe;

  constructor(private recipeService: RecipeService, private recipeListService: RecipeListService) {
    this.savedRecipes = [];
    this.recipes = [];
  }

  ngOnInit() {
    this.getRecipes();
  }

  public getSavedRecipes(): void {
    this.recipeListService.getSavedRecipes().subscribe(
      (response: Recipe[]) => {
        this.savedRecipes = response;
        console.log(this.savedRecipes);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getRecipes(): void {
    this.recipeService.getRecipes().subscribe(
      (response: Recipe[]) => {
        this.recipes = response;
        console.log(this.recipes);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(recipe: Recipe, mode:string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addRecipeModal');
    }
    if(mode === 'edit') {
      this.editRecipe = recipe;
      button.setAttribute('data-target', '#updateRecipeModal');
    }
    if(mode === 'delete') {
      this.deleteRecipe = recipe;
      button.setAttribute('data-target', '#deleteRecipeModal');
    }

    container.appendChild(button);
    button.click();
  }

  public onAddRecipe(addForm: NgForm): void {
    document.getElementById('add-recipe-form')?.click();
    this.recipeService.addRecipe(addForm.value).subscribe(
      (response: Recipe) => {
        console.log(response);
        this.getRecipes();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateRecipe(recipe: Recipe): void {
    this.recipeService.updateRecipe(recipe).subscribe(
      (response: Recipe) => {
        console.log(response);
        this.getRecipes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteRecipe(recipeId: number): void {
    this.recipeService.deleteRecipe(recipeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getRecipes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchRecipes(key: string): void {
    console.log(key);
    const results: Recipe[] = [];

    for (const recipe of this.recipes) {
      if (recipe.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(recipe);
      }
    }
    this.recipes = results;
    if (results.length === 0 || !key) {
      this.getRecipes();
    }
  }
}

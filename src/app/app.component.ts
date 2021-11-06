import {Component, OnInit} from '@angular/core';
import {Recipe} from "./recipe";
import {RecipeService} from "./recipe.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FoodbookSpringAngular';
  public recipes: Recipe[] | undefined;
  public editRecipe: Recipe | undefined;
  public deleteRecipe: Recipe | undefined;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.getRecipes();
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
      button.setAttribute('data-target', '#updateRecipeModal');
    }
    if(mode === 'delete') {
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
      if (recipe.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || recipe.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || recipe.descriptionLong.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || recipe.descriptionShort.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(recipe);
      }
    }
    this.recipes = results;
    if (results.length === 0 || !key) {
      this.getRecipes();
    }
  }
}

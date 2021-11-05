import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './recipe';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class RecipeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiServerUrl}/recipes/all`);
  }

  public addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.apiServerUrl}/recipes/add`, recipe);
  }

  public updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiServerUrl}/recipes/${recipe.id}`, recipe);
  }

  public deleteRecipe(recipeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/recipes/delete/${recipeId}`);
  }
}

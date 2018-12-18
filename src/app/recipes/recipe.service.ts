import { Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe("Hot Dog",
         "The best hot dog in town!",
          "https://leitesculinaria.com/wp-content/uploads/fly-images/96169/best-hot-dog-recipe-fi-400x225-c.jpg",
         [
            new Ingredient("Ketchup", 1),
            new Ingredient("Bun", 12)
         ]),
        new Recipe("Hamburger",
         "Just an average burger",
          "http://images.media-allrecipes.com/userphotos/960x960/3757723.jpg",
           [
               new Ingredient("Bun", 6),
               new Ingredient("Patty", 6)
           ])
    ];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
    
}
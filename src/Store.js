
import {observable, action, computed} from 'mobx';

class Store {

  @observable searchTerm = '';
  @observable loading = true;
  @observable drinks = [];
  @observable searchResults = [];
  @observable drinkDetails = {};
  @observable currentDrinkIndex = 0;

  @action updateSearchTerm(searchTerm) {
      this.searchTerm = searchTerm ? searchTerm : '';
      if(this.searchTerm){
        this.searchByDrink(searchTerm);
      }
  }

  @action setCurrentDrinkIndex(index) {
      this.currentDrinkIndex = index;
      console.log(this.drinks[this.currentDrinkIndex].idDrink)
      if(!this.searchTerm && this.drinks.length && this.drinks[this.currentDrinkIndex] && this.drinks[this.currentDrinkIndex].idDrink){
          this.fetchDrinkInfo(this.drinks[this.currentDrinkIndex].idDrink);
      }
  }

  @action prevDrink() {
      let index = this.currentDrinkIndex - 1;
      if (index < 1) {
          index = 0;
      }
      this.setCurrentDrinkIndex(index);
  }

  @action nextDrink() {
      let index = this.currentDrinkIndex + 1;
      const length = (this.searchTerm)? this.searchResults.length : this.drinks.length;
      if (index >= length) {
          index = length - 1;
      }
      this.setCurrentDrinkIndex(index);
  }

  @action fetchAllDrinks() {
     this.loading = true;
     fetch('http://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
     .then(res => res.json())
     .then(json => {
         if(json.drinks){
           this.drinks = json.drinks;
         }
     })
     .catch(err => {
       console.log('ERROR', err.message)
     })
     .finally(() => this.loading = false)
   }

   @action fetchDrinkInfo(drinkId) {
      if(!this.drinkDetails[drinkId]) {
        this.loading = true;
        fetch(`http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
        .then(res => res.json())
        .then(json => {
            return json.drinks && json.drinks[0];
        })
        .then(action(drink => {
            this.drinkDetails[drink.idDrink] = drink;
        }))
        .catch(err => console.log('ERROR', err.message))
        .finally(() => this.loading = false);
      }
    }

    @action searchByDrink(searchTerm) {
        this.loading = true;
       fetch(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
       .then(res => res.json())
       .then(json => {
         return json.drinks;
       }).then(action(drinks => {
           this.searchResults = drinks ? drinks : [];
       }))
       .catch(err => console.log('ERROR', err.message))
       .finally(() => this.loading = false);
     }

     @computed get currentDrink() {
        if(this.searchTerm && this.searchResults.length){
          return this.searchResults[this.currentDrinkIndex];
        } else {
          return this.drinkDetails[this.drinks[this.currentDrinkIndex].idDrink];
        }
        return null;
     }
}
export default new Store();

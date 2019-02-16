
import {observable, action, computed} from 'mobx';
import {PORTRAIT} from './Constants'

class Store {

  @observable orientation = PORTRAIT;
  @observable searchTerm = '';
  @observable loading = true;
  @observable drinks = [];
  @observable searchResults = [];
  @observable drinkDetails = {};
  @observable currentDrinkIndex = 0;


  @action changeOrientation(orientation) {
      this.orientation = orientation;
  }

  @action updateSearchTerm(searchTerm) {
      this.searchTerm = searchTerm ? searchTerm : '';
      if(this.searchTerm){
        this.searchByDrink(searchTerm);
      }
  }

  @action setCurrentDrinkIndex(index) {
      this.currentDrinkIndex = index;
      if(this.searchTerm && searchResults.length && searchResults[currentDrinkIndex]){
        this.currentDrinkId = searchResults[currentDrinkIndex].idDrink;
      } else if(this.drinks.length && this.drinks[this.currentDrinkIndex]){
        this.currentDrinkId = this.drinks[this.currentDrinkIndex].idDrink;
        if(this.currentDrinkId && !this.drinkDetails[this.currentDrinkId]) {
          this.fetchDrinkInfo(this.currentDrinkId)
        }
      }
  }

  @action prevImage() {
      this.index = this.index - 1;

        if (this.index < 1) {
            this.index = 0;
        }
  }

  @action nextImage() {
      this.index = this.index + 1;

      if (this.index > this.images.length) {
          this.galleryPage = this.galleryPage+1;
          this.fetchImages();
      }
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
            if(json.drinks){
              json.drinks.forEach((drink) => {
                   this.drinkDetails[drink.idDrink] = drink;
              });
            }
        })
        .catch(err => console.log('ERROR', err.message))
        .finally(() => this.loading = false);
      }
    }

    @action searchByDrink(searchTerm) {
        this.loading = true;
       fetch(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
       .then(res => res.json())
       .then(json => {
         if(json.drinks){
           this.searchResults = json.drinks;
         }
       })
       .catch(err => console.log('ERROR', err.message))
       .finally(() => this.loading = false);
     }

     @computed get currentDrink() {
        if(this.currentDrinkId) {
          if(this.searchTerm && this.searchResults.length){
            return this.searchResults[this.currentDrinkId];
          } else {
            return this.drinkDetails[this.currentDrinkId];
          }
        }
        return null;
     }
}
export default new Store();

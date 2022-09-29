import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HeroesComponent } from './heroes/heroes.component';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  heroes = localStorage;
  temp: Hero[] = [];

  deleted: boolean = false;

  constructor() { }

  getHeroes(): Hero[] {
    this.temp = [];
    for (let i: number = 0; i < this.heroes.length; i++) {
      this.temp.push(
        {
          id: Number(this.heroes.key(i)),
          name: String(this.heroes.getItem(String(this.heroes.key(i))))
        }
      );
    }
    return this.sortHeroes(this.temp);
  }

  ngOnInit() {
    if (this.heroes.length == 0 && this.deleted == false) {
      this.populateStorage();
    }
  }
  populateStorage() {
    for (let ind = 0; ind < HEROES.length; ind++) {
      this.heroes.setItem(String(HEROES[ind].id), HEROES[ind].name)
    }
  }

  addHero(name: string) {
    this.heroes.setItem(String(this.genId()), name);
  }

  deleteHero(id: number) {
    if (this.heroes.length == 1) this.deleted = true;
    this.heroes.removeItem(String(id));
  }

  resetHeroes() {
    this.heroes.clear();
    this.populateStorage();
  }

  sortHeroes(heroes: Hero[]): Hero[] {
    return heroes.sort((n1, n2) => n1.id - n2.id);;
  }

  updateHero(hero: Hero): any {
    this.heroes.setItem(String(hero.id), hero.name);
  }

  searchHeroes(term: string): Hero[] {
    let searchResult: Hero[] = [];
    if (!term.trim()) {
      return [];
    } else {
      for (let i = 0; i < this.heroes.length; i++) {
        if (this.temp[i].name.toLowerCase().includes(term.toLowerCase())) {
          searchResult.push(this.temp[i]);
        }
      }
      return searchResult;
    }
  }


  //copied from in-memory-data.service.ts:
  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(): number {
    let a: number = 0;
    if (this.heroes.length > 0) {
      for (let i = 0; i < this.heroes.length; i++) {
        if (a < Number(this.heroes.key(i))) a = Number(this.heroes.key(i));
      }
      return a + 1;
    } else {
      return 11;
    }
  }
}

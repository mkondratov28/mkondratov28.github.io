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

  deleted: boolean = false;

  constructor() { }

  getHeroes(): Hero[] {
    let temp: Hero[] = [];
    for (let i: number = 0; i < this.heroes.length; i++) {
      temp.push(
        {
          id: Number(this.heroes.key(i)),
          name: String(this.heroes.getItem(String(this.heroes.key(i))))
        }
      );
    }
    return temp;
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
    let sortedHeroes = heroes.sort((n1, n2) => n1.id - n2.id);
    return sortedHeroes;
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

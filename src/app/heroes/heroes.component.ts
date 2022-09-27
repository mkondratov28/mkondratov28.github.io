import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { StorageService } from '../storage.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { DialogOpenerComponent } from '../dialog-opener/dialog-opener.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  dialogOpener = new DialogOpenerComponent(this.dialog);

  constructor(
    private storageService: StorageService,
    private heroService: HeroService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    // this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    this.heroes = this.sortHeroes(this.storageService.getHeroes())
  }


  //   genId(heroes: Hero[]): number {
  //     return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  //   }
  // }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    // localStorage.setItem('neuerHeld', name);
    // localStorage.setItem(name.trim(), JSON.stringify(name));
    // localStorage.getItem('neuerHeld');
    // this.heroService.addHero({ name } as Hero)
    //   .subscribe(hero => {
    //     this.heroes.push(hero);
    //   });


    // this.heroService.addHero({ name } as Hero)
    //   .subscribe(hero => {
    //     this.heroes.push(hero);

    //Hallo?

    //   });
    this.storageService.addHero(name);
    this.getHeroes();

  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);

    // this.heroService.deleteHero(hero.id).subscribe();


    // this.heroService.deleteHero(hero.id).subscribe();
    this.storageService.deleteHero(hero.id);
  }

  reset() {
    this.storageService.resetHeroes();
    this.getHeroes();
  }


  // loeschen(name.trim()){
  //   localStorage.removeItem(name.trim());
  // }
  openDialog(hero: Hero): void {
    this.dialogOpener.openDialog(hero);
    console.log(hero);
  }

  sortHeroes(heroes: Hero[]): Hero[] {
    return this.storageService.sortHeroes(heroes);
  }

}

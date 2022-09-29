import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogOpenerComponent } from '../dialog-opener/dialog-opener.component';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  dialogOpener = new DialogOpenerComponent(this.dialog)

  constructor(private heroService: HeroService, private storageService: StorageService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    // this.heroService.getHeroes()
    //   .subscribe(heroes => this.heroes = heroes.slice(1, 5));
    this.heroes = this.storageService.getHeroes().slice(1, 5);
  }

  openDialog(hero: Hero): void {
    this.dialogOpener.openDialog(hero);
  }

}
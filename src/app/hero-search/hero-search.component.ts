import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { window } from 'rxjs/operators';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { DialogOpenerComponent } from '../dialog-opener/dialog-opener.component';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes: Hero[] = [];
  private searchTerms = new Subject<string>();

  dialogOpener = new DialogOpenerComponent(this.dialog);

  constructor(private heroService: HeroService, private storageService: StorageService, public dialog: MatDialog) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.heroes = this.storageService.searchHeroes(term);
  }

  ngOnInit(): void {
    // this.heroes$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.heroService.searchHeroes(term)),
    // );
  }

  openDialog(hero: Hero) {
    this.dialogOpener.openDialog(hero);
  }
}
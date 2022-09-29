import { Component, OnInit, Input, Inject } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HeroService } from '../hero.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: number,
      name: string
    },
    public dialogRef: MatDialogRef<HeroDetailComponent>,
  ) { }

  ngOnInit(): void {
    // this.getHero();
    this.getDialog();
  }

  //not used
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);


  }

  getDialog(): void {
    this.hero = this.data
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      // this.heroService.updateHero(this.hero).subscribe(() => this.closeDialog());
      this.storageService.updateHero(this.hero);
      this.closeDialog();
    }
  }

}

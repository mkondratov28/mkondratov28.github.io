import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-hero-leasing',
  templateUrl: './hero-leasing.component.html',
  styleUrls: ['./hero-leasing.component.css']
})
export class HeroLeasingComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
  }

  getHeroes() {
    let heroes = this.storageService.getHeroes();
  }

  lease() {

  }

}

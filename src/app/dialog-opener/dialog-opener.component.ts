import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-opener',
  templateUrl: './dialog-opener.component.html',
  styleUrls: ['./dialog-opener.component.css']
})
export class DialogOpenerComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(hero: Hero): void {
    const dialogRef = this.dialog.open(HeroDetailComponent, {
      height: '400px',
      width: '400px',
      data: {
        id: hero.id,
        name: hero.name
      },
    })
    console.log(hero);
  }

}

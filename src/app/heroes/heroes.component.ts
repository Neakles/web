import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero'; //import nama class Hero diluar folder
import { HeroService } from '../hero.service';
// import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  // heroes = HEROES;

  selectedHero: Hero;
  
  //hero kecil adalah properti
  //Hero adalah modelnya
  // hero: Hero = {
  //   id:1,
  //   name: 'windstorm'
  // }

  //untuk memanggil service
  //laukan dependency injection
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }


  // onSelect(hero: Hero): void { 
  //   this.selectedHero = hero;
  // }

  // getHeroes(): void {
  //   synchronus
  //   this.heroes = this.heroService.getHeroes();
  // }

  getHeroes(): void {
    //asynchronus
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes); //observable nya heroes
    //harus dimasukkan dalam properti heroes di file ini
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; } //jika value trim kosongan, maka langsung di return
    this.heroService.addHero({ name } as Hero) // jika tidak kosong, maka masuk perintah ini
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
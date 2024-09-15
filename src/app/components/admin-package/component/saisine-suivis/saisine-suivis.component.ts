import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saisine-suivis',
  templateUrl: './saisine-suivis.component.html',
  styleUrl: './saisine-suivis.component.scss'
})
export class SaisineSuivisComponent {

  constructor(private router: Router) { }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}

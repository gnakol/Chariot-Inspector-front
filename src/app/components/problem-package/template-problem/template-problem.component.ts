import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-problem',
  templateUrl: './template-problem.component.html',
  styleUrl: './template-problem.component.scss'
})
export class TemplateProblemComponent {

  constructor(private router: Router) { }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }

}

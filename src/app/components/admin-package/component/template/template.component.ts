import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent {

  constructor(private router: Router) { }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}

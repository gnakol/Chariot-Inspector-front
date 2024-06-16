import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrl: './suivi.component.scss'
})
export class SuiviComponent {

  isFormComplete = false;

  constructor(private router : Router)
  {

  }

  navigateTo(page: string) {
    this.router.navigateByUrl("/add-info-user");
  }

  checkFormCompletion() {
    // Implémentez la logique pour vérifier si les 4 premières sections sont complètes
    // et mettez à jour isFormComplete en conséquence
  }

}

import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";

@Component({
  selector: 'lib-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent {

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  constructor(private router: Router) {
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

}

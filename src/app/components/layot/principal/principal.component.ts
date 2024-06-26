import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MenuComponent, RouterOutlet, DashboardComponent, NavbarComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})

export class PrincipalComponent {

}

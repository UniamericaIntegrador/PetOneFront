import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component'; 
import { MenuComponent } from '../menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NavbarComponent, MenuComponent, RouterOutlet],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})

export class PrincipalComponent {

}

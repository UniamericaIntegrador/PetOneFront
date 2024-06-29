import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoginService } from '../../../auth/login.service';
import { Tutor } from '../../../models/tutor';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {
  title: string = '';  // Inicialização direta
  
  
  //usuario!: Usuario;

  tutor!: Tutor;

  loginService = inject(LoginService);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    //this.usuario = this.loginService.getUsuarioLogado();
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTitle();
    });

    // Atualiza o título na inicialização
    this.updateTitle();
  }

  updateTitle() {
    let route = this.activatedRoute.firstChild;
    while (route?.firstChild) {
      route = route.firstChild;
    }
    this.title = route?.snapshot.data['title'] ?? 'Default Title';
  }

  
}
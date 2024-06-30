import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoginService } from '../../../auth/login.service';
import { Tutor } from '../../../models/tutor';
import { TutorService } from '../../../services/tutor.service';

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

  usuario!: Tutor;
  
  loginService = inject(LoginService);

  tutorService = inject(TutorService);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.tutor = this.loginService.getUsuarioLogado();
    this.reloadUser();
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

  reloadUser(){
    this.tutorService.findByEmail(this.tutor.username).subscribe({
      next: retorno => {
        this.usuario = retorno;
      }
    })
  }

  
}
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
  pfp: string = "U";

  loginService = inject(LoginService);

  tutorService = inject(TutorService);

  usuario!: Tutor;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.tutor = this.loginService.getUsuarioLogado();
    this.reloadTutor();
  }

  ngOnInit(): void {
    this.tutor = this.loginService.getUsuarioLogado();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTitle();
    });

    // Atualiza o título na inicialização
    this.updateTitle();
  }

  reloadTutor(){
    this.tutorService.findByEmail(this.tutor.username).subscribe({
      next: retorno =>{
        this.usuario = retorno;
      }
    });
    //this.pfp = this.usuario.nome.substring(0,1);
  }

  updateTitle() {
    let route = this.activatedRoute.firstChild;
    while (route?.firstChild) {
      route = route.firstChild;
    }
    this.title = route?.snapshot.data['title'] ?? 'Default Title';
  }

  
}
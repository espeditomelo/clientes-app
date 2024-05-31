import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  nomeUsuario: string;
  senha: string;
  erroLogin: boolean;
  cadastrando: boolean;


  constructor(
    private router: Router
  ) { }

  onSubmit() {
    this.router.navigate(['/home']);
  }

  prepararCadastrar(event) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelarCadastro() {
    this.cadastrando = false;
  }


}

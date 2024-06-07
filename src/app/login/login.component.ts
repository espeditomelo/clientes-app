import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { AuthService } from '../auth.service';

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
  mensagemSucesso: string;


  constructor(
    private router: Router,
    private authService: AuthService
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

  cadastrar() {
    const usuario: Usuario = new Usuario();
    // usuario.nome = this.nomeUsuario;
    usuario.username = this.nomeUsuario;
    usuario.senha = this.senha;
    this.authService
      .salvar(usuario)
      .subscribe( response => {
        this.erroLogin = false;
        this.mensagemSucesso = 'O cadastro foi realizado com sucesso. Efetue o login.';
      }, error => {
        this.erroLogin = true;
        this.mensagemSucesso = null;
      })
  }


}

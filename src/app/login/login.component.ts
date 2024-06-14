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

  username: string;
  senha: string;
  cadastrando: boolean;
  mensagemSucesso: string;
  errors: String[];

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit() {

    this.authService
      .tentarLogar(this.username, this.senha)
      .subscribe(response => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('access_token', access_token);
        this.router.navigate(['/home'])
      }, errorResponse => {
        this.errors = ['Usuário e/ou senha incorreto(s).'];
      })

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
    usuario.username = this.username;
    usuario.senha = this.senha;
    this.authService
      .salvar(usuario)
      .subscribe( response => {
        this.mensagemSucesso = `O cadastro do usuário ${this.username} foi realizado com sucesso. Efetue o login.`;
        this.username = '';
        this.senha = '';
        this.errors = [];
      }, errorResponse => {
        this.mensagemSucesso = null;
        this.errors = errorResponse.error.errors;
      })
  }


}

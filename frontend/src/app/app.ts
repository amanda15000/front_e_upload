import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquivoService } from './ArquivoService'; // Puxando o arquivo que você acabou de salvar

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html', // Aponta para o seu arquivo HTML
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  public fileService = inject(ArquivoService); 
  public staticUrl = this.fileService.staticUrl; 

  arquivos: any[] = [];
  arquivoSelecionado: File | null = null;
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  ngOnInit() {
    this.carregarArquivos();
  }

  carregarArquivos() {
    this.fileService.listarArquivos().subscribe({
      next: (resposta) => {
        this.arquivos = resposta.files;
      },
      error: () => {
        this.mensagemErro = 'Não foi possível carregar os arquivos.';
      }
    });
  }

  aoSelecionarArquivo(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.arquivoSelecionado = file;
      this.mensagemErro = '';
      this.mensagemSucesso = '';
    }
  }

  fazerUpload() {
    if (!this.arquivoSelecionado) return;

    this.fileService.enviarArquivo(this.arquivoSelecionado).subscribe({
      next: (resposta) => {
        this.mensagemSucesso = resposta.message;
        this.arquivoSelecionado = null; 
        this.carregarArquivos(); 
      },
      error: (erro) => {
        this.mensagemErro = erro.error?.message || 'Erro inesperado ao fazer upload.';
      }
    });
  }

  deletar(filename: string) {
    this.fileService.removerArquivo(filename).subscribe({
      next: (resposta) => {
        this.mensagemSucesso = resposta.message;
        this.carregarArquivos(); 
      },
      error: (erro) => {
        this.mensagemErro = erro.error?.message || 'Arquivo não encontrado.';
      }
    });
  }
}
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http'; // Necessário para testes com HTTP
import { ArquivoService } from './ArquivoService'; // Puxando o nome correto do arquivo

describe('ArquivoService', () => {
  let service: ArquivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()] // Fornece o cliente HTTP para o teste não quebrar
    });
    service = TestBed.inject(ArquivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
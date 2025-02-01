import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmpresaService } from './empresa.service';

describe('EmpresaService', () => {
  let service: EmpresaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo para pruebas HTTP
      providers: [EmpresaService],
    });
    service = TestBed.inject(EmpresaService);
    httpMock = TestBed.inject(HttpTestingController); // Inyección del controlador de pruebas HTTP
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch empresas (GET request)', () => {
    const mockEmpresas = [
      { id: 1, nombre: 'Empresa A' },
      { id: 2, nombre: 'Empresa B' },
    ];

    service.getEmpresas().subscribe((empresas) => {
      expect(empresas.length).toBe(2);
      expect(empresas).toEqual(mockEmpresas);
    });

    const req = httpMock.expectOne('/api/empresas'); // Verifica la URL de la solicitud
    expect(req.request.method).toBe('GET'); // Verifica que sea una solicitud GET
    req.flush(mockEmpresas); // Simula la respuesta del servidor
  });
});

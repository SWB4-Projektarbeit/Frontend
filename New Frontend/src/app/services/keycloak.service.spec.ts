import { TestBed } from '@angular/core/testing';
import { KeycloakService } from './keycloak.service';

describe('KeycloakService', () => {
  let service: KeycloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [KeycloakService] });
    service = TestBed.inject(KeycloakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize correctly', async () => {
    await service.init();
    expect(service).toBeTruthy();
  });
});

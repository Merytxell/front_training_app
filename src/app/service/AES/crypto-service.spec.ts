import { TestBed } from '@angular/core/testing';

import { cryptoService } from './crypto-service.';

describe('AESEncryptDecryptServiceService', () => {
  let service: cryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(cryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

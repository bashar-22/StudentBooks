import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { showBookResolver } from './show-book.resolver';

describe('showBookResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => showBookResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { editBookResolver } from './edit-book.resolver';

describe('editBookResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => editBookResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

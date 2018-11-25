import { TestBed } from '@angular/core/testing';
import { ColorService } from './color.service';

describe('ColorService', () => {
  let service: ColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorService]
    });
    service = TestBed.get(ColorService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});

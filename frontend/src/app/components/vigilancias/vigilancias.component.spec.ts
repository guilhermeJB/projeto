import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VigilanciasComponent } from './vigilancias.component';

describe('VigilanciasComponent', () => {
  let component: VigilanciasComponent;
  let fixture: ComponentFixture<VigilanciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VigilanciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VigilanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

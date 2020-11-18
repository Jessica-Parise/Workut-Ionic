import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrivePage } from './drive.page';

describe('DrivePage', () => {
  let component: DrivePage;
  let fixture: ComponentFixture<DrivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

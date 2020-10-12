import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobEditPage } from './job-edit.page';

describe('JobEditPage', () => {
  let component: JobEditPage;
  let fixture: ComponentFixture<JobEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

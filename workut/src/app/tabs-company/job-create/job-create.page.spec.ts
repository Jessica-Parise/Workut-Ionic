import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobCreatePage } from './job-create.page';

describe('JobCreatePage', () => {
  let component: JobCreatePage;
  let fixture: ComponentFixture<JobCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

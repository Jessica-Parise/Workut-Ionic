import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobsManagementPage } from './jobs-management.page';

describe('JobsManagementPage', () => {
  let component: JobsManagementPage;
  let fixture: ComponentFixture<JobsManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobsManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

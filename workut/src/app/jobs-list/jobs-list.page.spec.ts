import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobsListPage } from './jobs-list.page';

describe('JobsListPage', () => {
  let component: JobsListPage;
  let fixture: ComponentFixture<JobsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

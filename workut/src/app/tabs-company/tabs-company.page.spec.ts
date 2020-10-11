import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsCompanyPage } from './tabs-company.page';

describe('TabsCompanyPage', () => {
  let component: TabsCompanyPage;
  let fixture: ComponentFixture<TabsCompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsCompanyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

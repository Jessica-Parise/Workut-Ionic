import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsUserPage } from './tabs-user.page';

describe('TabsUserPage', () => {
  let component: TabsUserPage;
  let fixture: ComponentFixture<TabsUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

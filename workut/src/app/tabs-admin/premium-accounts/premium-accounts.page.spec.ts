import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PremiumAccountsPage } from './premium-accounts.page';

describe('PremiumAccountsPage', () => {
  let component: PremiumAccountsPage;
  let fixture: ComponentFixture<PremiumAccountsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumAccountsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PremiumAccountsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

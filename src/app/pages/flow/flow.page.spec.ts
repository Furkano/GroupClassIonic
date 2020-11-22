import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlowPage } from './flow.page';

describe('FlowPage', () => {
  let component: FlowPage;
  let fixture: ComponentFixture<FlowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

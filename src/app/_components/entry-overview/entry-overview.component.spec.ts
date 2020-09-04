import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryOverviewComponent } from './entry-overview.component';

describe('EntryOverviewComponent', () => {
  let component: EntryOverviewComponent;
  let fixture: ComponentFixture<EntryOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

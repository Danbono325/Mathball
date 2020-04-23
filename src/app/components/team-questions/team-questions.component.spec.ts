import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamQuestionsComponent } from './team-questions.component';

describe('TeamQuestionsComponent', () => {
  let component: TeamQuestionsComponent;
  let fixture: ComponentFixture<TeamQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

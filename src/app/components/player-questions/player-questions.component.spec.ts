import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerQuestionsComponent } from './player-questions.component';

describe('PlayerQuestionsComponent', () => {
  let component: PlayerQuestionsComponent;
  let fixture: ComponentFixture<PlayerQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

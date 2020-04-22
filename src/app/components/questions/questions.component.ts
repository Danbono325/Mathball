import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiServiceService) { }

  curPlayerID;
  curTeamID;
  allQuestions: any[] = [];
  questions: any[] = [];
  yearsActive: any[] = [];
  playerName;
  position;

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.position = this.activatedRoute.snapshot.paramMap.get('position');
    this.curTeamID = this.activatedRoute.snapshot.paramMap.get('teamID');
    if(id.length > 3) {
      this.curPlayerID =id;
      this.apiService.getPlayerDetail(id).subscribe(data => {
        this.playerName = data['player_info']['queryResults']['row']['name_display_first_last'];  
        let startYear = Number(data['player_info']['queryResults']['row']['pro_debut_date'].split('-')[0]);
        for(var i = 2019; i >= startYear; i--) {
          this.yearsActive.push(String(i));
        }
        console.log(this.yearsActive);
      })
      this.apiService.getQuestions().subscribe(data => {
        // console.log(data['hitter']);
        if(this.position == "P"){
          this.allQuestions = data['pitcher']['questions'];
        }
        else if(this.position == "NA"){
          this.allQuestions = data['team']['questions'];
        }
        else {
          this.allQuestions = data['hitter']['questions'];
        }
       
        console.log(this.allQuestions);
        this.setUpQuestions();
      })
    }
    else {
      this.curTeamID = id;
    }
    console.log('CUR PLAYER ID IN QUESTIONS: ', this.curPlayerID);
  }

  setUpQuestions() {
    for(var i = 0; i < 3; i++) {
      let index = Math.floor(Math.random() * this.allQuestions.length) + 0
      if(this.position != "P" && this.position != "NA") {
        this.makeHittingQuestion(this.allQuestions[index]);
      }
      else if(this.position == "P") {
        console.log('PITCHER');
        this.makePitchingQuestion(this.allQuestions[index]);
      }
      else {
        this.makeTeamQuestion(this.allQuestions[index]);
      }
      this.allQuestions.splice(index,1);
    }
    console.log(this.questions);
  }

  makeHittingQuestion(question) {
    let q = "";
    let yearIndex = Math.floor(Math.random() * this.yearsActive.length) + 0
    this.apiService.getHittingStats(this.yearsActive[yearIndex], this.curPlayerID).subscribe(data => {
      let stats = data['sport_hitting_tm']['queryResults']['row'];
      console.log(stats);
      q = question['q']
      let vars = question['vars']
      q = q.replace('$', this.yearsActive[yearIndex]);
      q = q.replace('PLAYER', this.playerName);
      q = q.replace('%', stats[vars[0]]);
      q = q.replace('#', stats[vars[1]]);
      let answer = Number(stats[vars[0]]) / Number(stats[vars[1]]);
      console.log('QUESTION: ', q);
      this.addQuestion(q, answer);
    })
    console.log(question);


  }

  makePitchingQuestion(question) {
    let q = "";
    let yearIndex = Math.floor(Math.random() * this.yearsActive.length) + 0
    this.apiService.getPitchingStats(this.yearsActive[yearIndex], this.curPlayerID).subscribe(data => {
      let stats = data['sport_pitching_tm']['queryResults']['row'];
      console.log(stats);
      q = question['q']
      let vars = question['vars']
      q = q.replace('$', this.yearsActive[yearIndex]);
      q = q.replace('PLAYER', this.playerName);
      q = q.replace('%', stats[vars[0]]);
      q = q.replace('#', stats[vars[1]]);
      let answer = Number(stats[vars[0]]) / Number(stats[vars[1]]);
      console.log('QUESTION: ', q);
      this.addQuestion(q, answer);
    })
  }

  makeTeamQuestion(question) {

  }

  addQuestion(q, answer) {
    this.questions.push({"q": q, "answer": answer});
  }

  showAnswer(value) {
    console.log(value);
  }

}

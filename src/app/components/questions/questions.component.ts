import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.scss"],
})
export class QuestionsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiServiceService
  ) {}
  
  totalAnswered = 0;
  allAnswered = false;
  curPlayerID;
  curTeamID;
  allQuestions: any[] = [];
  questions: any[] = [];
  yearsActive: any[] = [];
  playerName;
  position;
  startYear;
  questionState = {
    q1: [true, false, false],
    q2: [true, false, false],
    q3: [true, false, false],
  };

  allTeamStats: any[] = [];
  teamName;

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.position = this.activatedRoute.snapshot.paramMap.get("position");
    this.curTeamID = this.activatedRoute.snapshot.paramMap.get("teamID");
    this.startYear = Number(this.activatedRoute.snapshot.paramMap.get("year"));
    for (var i = 2019; i >= this.startYear; i--) {
      this.yearsActive.push(String(i));
    }
    console.log(this.yearsActive);
    if (id.length > 3) {
      this.curPlayerID = id;
      this.apiService.getPlayerDetail(id).subscribe((data) => {
        this.playerName =
          data["player_info"]["queryResults"]["row"]["name_display_first_last"];
        // let startYear = Number(data['player_info']['queryResults']['row']['pro_debut_date'].split('-')[0]);
      });
      this.apiService.getQuestions().subscribe((data) => {
        // console.log(data['hitter']);
        if (this.position == "P") {
          this.allQuestions = data["pitcher"]["questions"];
        } else if (this.position == "NA") {
          this.allQuestions = data["team"]["questions"];
        } else {
          this.allQuestions = data["hitter"]["questions"];
        }

        this.setUpQuestions();
      });
    } else {
      this.curTeamID = id;
      this.teamName = this.apiService.teams[this.curTeamID];
      this.apiService.getQuestions().subscribe((data) => {
        this.allQuestions = data['team']['questions'];
        for(var i = 0; i < this.allQuestions.length; i++) {
          this.allQuestions[i]['q'] =  this.allQuestions[i]['q'].replace('TEAM', this.teamName);
        }
      });
      console.log('ALL TEAM QUESTIONS: ', this.allQuestions);
      this.apiService.getTeamStats().subscribe(data => {
        console.log(data);
        let stats = data['stats'];
        
        for(var i = 0; i < stats.length; i++) {;
            if(stats[i]['teamID'] == this.curTeamID){
              this.allTeamStats.push(stats[i]);
            }
        }
        this.setUpQuestions();
      });
    }
  }

  setUpQuestions() {
    for (var i = 0; i < 3; i++) {
      let index = Math.floor(Math.random() * this.allQuestions.length) + 0;
      if (this.position != "P" && this.position != "NA") {
        this.makeHittingQuestion(this.allQuestions[index]);
      } else if (this.position == "P") {
        console.log("PITCHER");
        this.makePitchingQuestion(this.allQuestions[index]);
      } else {
        this.makeTeamQuestion(this.allQuestions[index]);
      }
      this.allQuestions.splice(index, 1);
    }
    console.log(this.questions);
  }

  makeHittingQuestion(question) {
    let q = "";
    let yearIndex = Math.floor(Math.random() * this.yearsActive.length) + 0;
    this.apiService
      .getHittingStats(this.yearsActive[yearIndex], this.curPlayerID)
      .subscribe((data) => {
        let stats = data["sport_hitting_tm"]["queryResults"]["row"];
        console.log(stats);
        q = question["q"];
        let vars = question["vars"];
        q = q.replace("$", this.yearsActive[yearIndex]);
        q = q.replace("PLAYER", this.playerName);
        q = q.replace("%", stats[vars[0]]);
        q = q.replace("#", stats[vars[1]]);
        let answer = Number(stats[vars[0]]) / Number(stats[vars[1]]);
        console.log("QUESTION: ", q);
        let finalAnswer = String(answer.toFixed(3));
        this.addQuestion(q, finalAnswer);
      });
    console.log(question);
  }

  makePitchingQuestion(question) {
    let q = "";
    let yearIndex = Math.floor(Math.random() * this.yearsActive.length) + 0;
    this.apiService
      .getPitchingStats(this.yearsActive[yearIndex], this.curPlayerID)
      .subscribe((data) => {
        let stats = data["sport_pitching_tm"]["queryResults"]["row"];
        console.log(stats);
        q = question["q"];
        let vars = question["vars"];
        q = q.replace("$", this.yearsActive[yearIndex]);
        q = q.replace("PLAYER", this.playerName);
        q = q.replace("%", stats[vars[0]]);
        q = q.replace("#", stats[vars[1]]);
        let answer = Number(stats[vars[0]]) / Number(stats[vars[1]]);
        console.log("QUESTION: ", q);
        let finalAnswer = String(answer.toFixed(3));
        this.addQuestion(q, finalAnswer);
      });
  }

  makeTeamQuestion(question) {
    console.log('TEAM Q: ', question);
    let q = "";
    let yearIndex = Math.floor(Math.random() * this.yearsActive.length) + 0;
    let index = Math.floor(Math.random() * 4) + 0;

    q = question['q'];
    let vars = question["vars"];
    q = q.replace("$", this.yearsActive[yearIndex]);
    q = q.replace("TEAM", this.teamName);
    q = q.replace("%", this.allTeamStats[index][vars[0]]);
    q = q.replace("#", this.allTeamStats[index][vars[1]]);
    let answer = Number(this.allTeamStats[index][vars[0]]) / Number(this.allTeamStats[index][vars[1]]);
    let finalAnswer = String(answer.toFixed(3));
    // let finalAnswer = answer;
    this.addQuestion(q, finalAnswer);
  }

  addQuestion(q, answer) {
    this.questions.push({ q: q, answer: answer });
  }

  correct = 3;

  showAnswer(value, index) {
    this.totalAnswered++;
    console.log(value);
    if (value == this.questions[index]["answer"]) {
      //CORRECT
      if (index == 0) {
        this.questionState["q1"] = [false, false, true];
      } else if (index == 1) {
        this.questionState["q2"] = [false, false, true];
      } else {
        this.questionState["q3"] = [false, false, true];
      }
    } else {
      this.correct--;
      //WRONG
      if (index == 0) {
        this.questionState["q1"] = [false, true, false];
      } else if (index == 1) {
        this.questionState["q2"] = [false, true, false];
      } else {
        this.questionState["q3"] = [false, true, false];
      }
    }

    if(this.totalAnswered == 3) {
      this.allAnswered = true;
    }
  }

  refreshPage() {
    location.reload();
  }


}

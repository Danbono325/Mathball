import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-questions',
  templateUrl: './team-questions.component.html',
  styleUrls: ['./team-questions.component.scss']
})
export class TeamQuestionsComponent implements OnInit {

  colors;
  curTeamID;
  constructor(private apiService: ApiServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.curTeamID = this.activatedRoute.snapshot.paramMap.get('teamID');
    this.apiService.getColors().subscribe((data) => {
      for (var i = 0; i < 31; i++) {
        if (data[i]["id"] == this.activatedRoute.snapshot.paramMap.get('teamID')) {
          let color = data[i]["colors"]["hex"];
          this.colors = color;
        }
      }
    });
  }

  getTeamColorStyle(index) {
    if (index < 4) {
      return {
        top: -13 + index * 13 + "vh",
        position: "absolute",
        left: "-15vw",
        width: "150vw",
        height: 13 + "vh",
        backgroundColor: "#" + this.colors[index],
        transform: "rotate(13deg)",
        zIndex: "-100",
        opacity: "0.87",
      };
    } else {
      return {};
    }
  }

}

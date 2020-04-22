import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-player-questions',
  templateUrl: './player-questions.component.html',
  styleUrls: ['./player-questions.component.scss']
})
export class PlayerQuestionsComponent implements OnInit {

  curPlayerID;
  colors;

  constructor(private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private apiService: ApiServiceService) { }

  ngOnInit() {
    this.curPlayerID = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiService.getColors().subscribe((data) => {
      for (var i = 0; i < 31; i++) {
        if (data[i]["id"] == this.activatedRoute.snapshot.paramMap.get('teamID')) {
          let color = data[i]["colors"]["hex"];
          this.colors = color;
        }
      }
    });
  }

  getPhoto() {
    let photoURL =
      "https://securea.mlb.com/mlb/images/players/head_shot/" + this.curPlayerID + "@2x.jpg";

    return this.sanitizer.bypassSecurityTrustUrl(photoURL);
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

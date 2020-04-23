import { Component, OnInit } from "@angular/core";
import { Logo } from "../../models/Logo";
import { Router } from '@angular/router';

@Component({
  selector: "app-teams",
  templateUrl: "./teams.component.html",
  styleUrls: ["./teams.component.scss"],
})
export class TeamsComponent implements OnInit {
  logos: Logo[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    for (var i = 108; i < 122; i++) {
      let newLogo = {
        imgSrc: "https://www.mlbstatic.com/team-logos/" + i + ".svg",
        teamID: i,
      };
      this.logos.push(newLogo);
    }
    for (var i = 133; i < 148; i++) {
      let newLogo = {
        imgSrc: "https://www.mlbstatic.com/team-logos/" + i + ".svg",
        teamID: i,
      };
      this.logos.push(newLogo);
    }
    let newLogo = {
      imgSrc: "https://www.mlbstatic.com/team-logos/158.svg",
      teamID: 158,
    };
    this.logos.push(newLogo);
  }

  showDetails(
    position: String,
    teamID: String,
    startYear: string
  ) {
    console.log(startYear);
    // startYear = startYear.split("-")[0]
    this.router.navigate(['questions/team/' + teamID +"/" + position + "/" + teamID + "/" + startYear]);
  }

}

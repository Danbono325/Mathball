import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-teams",
  templateUrl: "./teams.component.html",
  styleUrls: ["./teams.component.scss"],
})
export class TeamsComponent implements OnInit {
  teams = [
    {
      id: 1,
      name: "Rays",
    },
    {
      id: 2,
      name: "Yankees",
    },
    {
      id: 3,
      name: "Red Sox",
    },
    {
      id: 4,
      name: "Orioles",
    },
    {
      id: 5,
      name: "Blue Jays",
    },
  ];

  constructor() {}

  ngOnInit() {}
}

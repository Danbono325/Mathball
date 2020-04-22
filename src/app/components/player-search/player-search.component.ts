import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.scss']
})
export class PlayerSearchComponent implements OnInit {

  value="";
  searchTerm="";
  buttonClicked = false;
  numReturned = -1;
  players: any[] = [];
  constructor(private apiService: ApiServiceService, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {
  }


  getData() {
    this.searchTerm = this.value;

    if (this.searchTerm != "") {
      this.apiService.searchPlayers(this.searchTerm).subscribe(data => {
        let res = data["search_player_all"];
        let query = res["queryResults"];
        let row = query["row"];
        if (row != null) {
          this.numReturned = row.length;
          this.players = row;
          console.log(this.players);
        } else {
          this.numReturned = -1;
        }

        this.buttonClicked = true;
      });
    } else {
      this.players = <any>[];
      this.numReturned = -2;
      this.buttonClicked = true;
    }
  }

  getPhoto(id: String) {
    let photoURL =
      "https://securea.mlb.com/mlb/images/players/head_shot/" + id + "@2x.jpg";

    return this.sanitizer.bypassSecurityTrustUrl(photoURL);
  }

  onEnter(v) {
    this.value = v;
    this.getData();
  }

  showDetails(
    playerID: String,
    position: String,
    teamID: String,
    startYear: string
  ) {
    console.log(startYear);
    startYear = startYear.split("-")[0];
    this.router.navigate(['questions/player/' + playerID +"/" + position + "/" + teamID + "/" + startYear]);
    console.log(playerID, teamID, position);
  }
}

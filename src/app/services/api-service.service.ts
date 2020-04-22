import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  readonly playerSearchURL = "http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='" 

  constructor(private http: HttpClient) { }

  searchPlayers(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(this.playerSearchURL + searchTerm + "%25'");
  }

  getQuestions() {
    return this.http.get("../../assets/questions.json");
  }
  
  getColors() {
    return this.http.get("../../assets/colors.json");
  }

  getPlayerDetail(playerID) {
    return this.http.get("http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='" + playerID + "'")
  }

  getHittingStats(year, playerID) {
    let url = "http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='"+ year + "'&player_id='" + playerID + "'";

    return this.http.get(url);
  }

  getPitchingStats(year, playerID) {
    let url = "http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='"+ year + "'&player_id='" + playerID + "'";

    return this.http.get(url);
  }
}

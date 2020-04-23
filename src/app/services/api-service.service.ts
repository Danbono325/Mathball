import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  teams = {"108":"Los Angeles Angels","109":"Arizona Diamondbacks","110":"Baltimore Orioles","111":"Boston Red Sox","112":"Chicago Cubs","113":"Cincinnati Reds","114":"Cleveland Indians","115":"Colorado Rockies","116":"Detroit Tigers","117":"Houston Astros","118":"Kansas City Royals","119":"Los Angeles Dodgers","120":"Washington Nationals","121":"New York Mets","133":"Oakland Athletics","134":"Pittsburgh Pirates","135":"San Diego Padres","136":"Seattle Mariners","137":"San Francisco Giants","138":"St. Louis Cardinals","139":"Tampa Bay Rays","140":"Texas Rangers","141":"Toronto Blue Jays","142":"Minnesota Twins","143":"Philadelphia Phillies","144":"Atlanta Braves","145":"Chicago White Sox","146":"Miami Marlins","147":"New York Yankees","158":"Milwaukee Brewers"}

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

  getTeamName(teamID) {

    let url = "http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='" + teamID +  "'";
    return this.http.get(url);

  }

  getTeamStats() {
    return this.http.get("../../assets/team-stats.json");
  }

  getPitchingStats(year, playerID) {
    let url = "http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='"+ year + "'&player_id='" + playerID + "'";

    return this.http.get(url);
  }
}

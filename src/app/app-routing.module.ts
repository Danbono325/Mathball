import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlayerSearchComponent } from "./components/player-search/player-search.component";
import { TeamsComponent } from "./components/teams/teams.component";
import { QuestionsComponent } from "./components/questions/questions.component";
import { PlayerQuestionsComponent } from "./components/player-questions/player-questions.component";

const routes: Routes = [
  { path: "", component: PlayerSearchComponent },
  {
    path: "teams",
    component: TeamsComponent,
  },
  {
    path: "questions/player/:id/:position/:teamID",
    component: PlayerQuestionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

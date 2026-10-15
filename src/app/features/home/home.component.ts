import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { APP_TITLE } from "@app/app.constants";

@Component({
  selector: "app-home",
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  protected readonly title = APP_TITLE;
}

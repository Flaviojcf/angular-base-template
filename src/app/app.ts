import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ToastModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./app.html",
})
export class AppComponent {}

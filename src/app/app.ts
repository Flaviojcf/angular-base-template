import { Component, inject, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ErrorTestingService } from "@core/error-handling/error-testing.service";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ToastModule],
  templateUrl: "./app.html",
})
export class AppComponent {
  private readonly errorTestingService = inject(ErrorTestingService);

  protected readonly title = signal("angular-base-template");
  protected readonly lastHttpErrorStatus = signal<number | null>(null);

  protected simulateHttpError(status: number): void {
    this.errorTestingService.simulateHttpError(status).subscribe({
      next: () => this.lastHttpErrorStatus.set(null),
      error: () => this.lastHttpErrorStatus.set(status),
    });
  }
}

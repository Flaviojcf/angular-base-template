import { TestBed } from "@angular/core/testing";
import { Title } from "@angular/platform-browser";
import { Router, provideRouter } from "@angular/router";
import { RouterTestingHarness } from "@angular/router/testing";
import { MessageService } from "primeng/api";
import { AppComponent } from "./app";
import { APP_TITLE } from "./app.constants";
import { routes } from "./app.routes";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes), MessageService],
    }).compileComponents();
  });

  it("renders the notification outlet and the router outlet", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("p-toast")).not.toBeNull();
    expect(compiled.querySelector("router-outlet")).not.toBeNull();
  });

  it("lazy loads the home page and sets the document title", async () => {
    const harness = await RouterTestingHarness.create("/");

    expect(harness.routeNativeElement?.querySelector("h1")?.textContent).toContain(
      "Sua base Angular",
    );
    expect(TestBed.inject(Title).getTitle()).toBe(APP_TITLE);
  });

  it("redirects unknown routes to the home page", async () => {
    const harness = await RouterTestingHarness.create("/unknown/route");

    expect(TestBed.inject(Router).url).toBe("/");
    expect(harness.routeNativeElement?.querySelector("h1")).not.toBeNull();
  });
});

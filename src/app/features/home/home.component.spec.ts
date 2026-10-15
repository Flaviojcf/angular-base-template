import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { APP_TITLE } from "@app/app.constants";
import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it("shows the application title linking to the home page", async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    await fixture.whenStable();

    const link = (fixture.nativeElement as HTMLElement).querySelector("header a");
    expect(link?.textContent?.trim()).toBe(APP_TITLE);
    expect(link?.getAttribute("href")).toBe("/");
  });
});

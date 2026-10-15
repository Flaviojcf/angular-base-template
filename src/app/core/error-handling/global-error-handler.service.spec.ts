import { HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { NotificationService } from "@core/notifications/notification.service";
import { GlobalErrorHandlerService } from "./global-error-handler.service";

describe("GlobalErrorHandlerService", () => {
  let handler: GlobalErrorHandlerService;
  let consoleError: ReturnType<typeof vi.spyOn>;
  const notifyError = vi.fn();

  beforeEach(() => {
    notifyError.mockReset();
    consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

    TestBed.configureTestingModule({
      providers: [
        GlobalErrorHandlerService,
        { provide: NotificationService, useValue: { error: notifyError } },
      ],
    });

    handler = TestBed.inject(GlobalErrorHandlerService);
  });

  afterEach(() => vi.restoreAllMocks());

  it("logs and notifies unexpected errors", () => {
    const error = new Error("boom");

    handler.handleError(error);

    expect(consoleError).toHaveBeenCalledWith("[GlobalErrorHandler]", error);
    expect(notifyError).toHaveBeenCalledWith("Erro inesperado", "Tente novamente em instantes.");
  });

  it("normalizes string errors", () => {
    handler.handleError("boom");

    const [, logged] = consoleError.mock.calls[0];
    expect(logged).toBeInstanceOf(Error);
    expect((logged as Error).message).toBe("boom");
  });

  it("keeps unknown values as the cause", () => {
    const value = { reason: "boom" };

    handler.handleError(value);

    const [, logged] = consoleError.mock.calls[0];
    expect((logged as Error).message).toBe("Unexpected application error");
    expect((logged as Error).cause).toBe(value);
  });

  it("does not notify HTTP errors twice", () => {
    handler.handleError(new HttpErrorResponse({ status: 500, url: "/api/items" }));

    expect(consoleError).toHaveBeenCalled();
    expect(notifyError).not.toHaveBeenCalled();
  });
});

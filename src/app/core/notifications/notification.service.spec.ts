import { TestBed } from "@angular/core/testing";
import { MessageService } from "primeng/api";
import { NotificationService } from "./notification.service";

describe("NotificationService", () => {
  let notificationService: NotificationService;
  const add = vi.fn();

  beforeEach(() => {
    add.mockReset();
    TestBed.configureTestingModule({
      providers: [{ provide: MessageService, useValue: { add } }],
    });
    notificationService = TestBed.inject(NotificationService);
  });

  it("shows error toasts for five seconds", () => {
    notificationService.error("Erro", "Detalhe");

    expect(add).toHaveBeenCalledWith({
      severity: "error",
      summary: "Erro",
      detail: "Detalhe",
      life: 5000,
    });
  });

  it("shows success toasts for three seconds", () => {
    notificationService.success("Pronto", "Salvo");

    expect(add).toHaveBeenCalledWith({
      severity: "success",
      summary: "Pronto",
      detail: "Salvo",
      life: 3000,
    });
  });
});

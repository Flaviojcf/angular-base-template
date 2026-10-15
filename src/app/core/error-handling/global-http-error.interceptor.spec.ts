import { HttpClient, provideHttpClient, withInterceptors } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { NotificationService } from "@core/notifications/notification.service";
import { globalHttpErrorInterceptor } from "./global-http-error.interceptor";

describe("globalHttpErrorInterceptor", () => {
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;
  const notifyError = vi.fn();

  beforeEach(() => {
    notifyError.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([globalHttpErrorInterceptor])),
        provideHttpClientTesting(),
        { provide: NotificationService, useValue: { error: notifyError } },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
    vi.restoreAllMocks();
  });

  it.each([
    [0, "Não foi possível conectar ao servidor."],
    [400, "Verifique os dados enviados."],
    [401, "Sua sessão expirou."],
    [403, "Você não tem permissão para executar esta ação."],
    [404, "Recurso não encontrado."],
    [500, "Erro interno. Tente novamente em instantes."],
    [503, "Algo deu errado ao processar a requisição."],
  ])("notifies HTTP %i and rethrows the error", (status, message) => {
    const onError = vi.fn();
    httpClient.get("/api/items").subscribe({ error: onError });

    httpTesting
      .expectOne("/api/items")
      .flush(null, { status, statusText: status === 0 ? "Unknown Error" : "Error" });

    expect(notifyError).toHaveBeenCalledWith("Erro na requisição", message);
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ status }));
  });

  it("does not notify successful responses", () => {
    const onNext = vi.fn();
    httpClient.get("/api/items").subscribe(onNext);

    httpTesting.expectOne("/api/items").flush({ id: 1 });

    expect(onNext).toHaveBeenCalledWith({ id: 1 });
    expect(notifyError).not.toHaveBeenCalled();
  });
});

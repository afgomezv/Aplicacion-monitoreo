import { CheckService } from "./check-service";

describe("CheckService UseCase", () => {
  const mockRespository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckService(
    mockRespository,
    successCallback,
    errorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call successCallback when fetch return true", async () => {
    const wasOk = await checkService.execute("https://google.com");

    expect(wasOk).toBeTruthy();
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    expect(mockRespository.saveLog).toHaveBeenCalledWith(expect.anything());
  });

  test("should call erroCallback when fetch return false", async () => {
    const wasOk = await checkService.execute("https://google4578.com");

    expect(wasOk).toBeFalsy();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();

    expect(mockRespository.saveLog).toHaveBeenCalledWith(expect.anything());
  });
});

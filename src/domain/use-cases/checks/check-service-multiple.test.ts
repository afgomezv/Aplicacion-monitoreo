import { CheckServiceMultiple } from "./check-service-multiple";

describe("CheckService UseCase", () => {
  const mockRespOne = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRespTwo = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRespThree = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckServiceMultiple(
    [mockRespOne, mockRespTwo, mockRespThree],
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

    expect(mockRespOne.saveLog).toHaveBeenCalledWith(expect.anything());
    expect(mockRespTwo.saveLog).toHaveBeenCalledWith(expect.anything());
    expect(mockRespThree.saveLog).toHaveBeenCalledWith(expect.anything());
  });

  test("should call erroCallback when fetch return false", async () => {
    const wasOk = await checkService.execute("https://google4578.com");

    expect(wasOk).toBeFalsy();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();

    expect(mockRespOne.saveLog).toHaveBeenCalledWith(expect.anything());
    expect(mockRespTwo.saveLog).toHaveBeenCalledWith(expect.anything());
    expect(mockRespThree.saveLog).toHaveBeenCalledWith(expect.anything());
  });
});

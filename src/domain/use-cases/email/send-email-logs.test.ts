import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";

const mockEmailService = {
  sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
};

const mockLogRepository: LogRepository = {
  saveLog: jest.fn(),
  getLogs: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("SendEmailLogs", () => {
  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  );

  test("should call senEmail and saveLog", async () => {
    const result = await sendEmailLogs.execute("afgomezv@hotmail.com");

    expect(result).toBeTruthy();
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "low",
      message: "Log email sent",
      origin: "send-email-logs",
    });
  });

  test("should log in case of error", async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

    const result = await sendEmailLogs.execute("afgomezv@hotmail.com");

    expect(result).toBeFalsy;
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "high",
      message: "Error: Email log was not sent",
      origin: "send-email-logs",
    });
  });
});

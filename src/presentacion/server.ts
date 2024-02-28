import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email-service";
import { CronService } from "./cron/cron-service";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());

const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource()
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started....");

    //Todo: Send Email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "afgomezvonline@gmail.com",
    //   "afgomezv@hotmail.com",
    // ]);

    // emailService.sendEmailWithFileSystemLogs([
    //   "afgomezvonline@gmail.com",
    //   "afgomezv@hotmail.com",
    // ]);

    // const logs = await LogRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.error(`Error`)
      ).execute(url);
      //new CheckService().execute("http://localhost:3000/posts");
    });
  }
}

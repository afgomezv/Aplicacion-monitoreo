import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { EmailService } from "./email/email-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
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

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://google.com";
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.error(`Error`)
    //   ).execute(url);
    //   //new CheckService().execute("http://localhost:3000/posts");
    // });
  }
}

import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/env.plugin";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporte = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  //constructor(private readonly logRepository: LogRepository) {}

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options;

    try {
      const sendInformation = await this.transporte.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      // const log = new LogEntity({
      //   level: LogSeverityLevel.low,
      //   message: "Email sent",
      //   origin: "email.service.ts",
      // });
      //this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      // const log = new LogEntity({
      //   level: LogSeverityLevel.high,
      //   message: "Email not sent",
      //   origin: "email.service.ts",
      // });
      //this.logRepository.saveLog(log);

      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
      <h3>Logs de sistema NOC</h3>
      <p>Por favor, revisar los logs del servidor.</p>
      <p>Ver logs adjuntos archivo grande</p>
    `;

    const attachements: Attachment[] = [
      { filename: "logs-all.log", path: "./logs/logs-all.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
    ];

    return this.sendEmail({
      to,
      subject,
      attachements,
      htmlBody,
    });
  }
}

import ClientResponse from "../utils/clientResponse";
import EmailPayload from "../utils/emailPayload";
import MailGunClient from "../components/mailGunClient";
import SendGridClient from "../components/sendGridClient";

class EmailClient {
  constructor(
    public emailPayload: EmailPayload,
    protected mailGunClient: MailGunClient = new MailGunClient(emailPayload),
    protected sendGridClient: SendGridClient = new SendGridClient(emailPayload),
    protected clientResponse: ClientResponse = new ClientResponse()
  ) {}

  public async sendEmail() {
    let mailGunResponse: any, sendGridResponse: any;
    try {
      mailGunResponse = await this.mailGunClient.processEmail();
      if (mailGunResponse && mailGunResponse.status === 500) {
        sendGridResponse = await this.sendGridClient.processEmail();
        return sendGridResponse;
      } else {
        return mailGunResponse;
      }
    } catch (error) {
      let message: object = {
        method: "EmailClient::sendEmail",
        message: "Server Error.",
      };
      return this.clientResponse.setError(message, 500);
    }
  }
}

export default EmailClient;

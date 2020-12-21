import axios, { AxiosResponse } from "axios";
import qs from "qs";
import "dotenv/config";
import EmailPayload from "../utils/emailPayload";
import Sender from "../utils/sender";
import ClientResponse from "../utils/clientResponse";

class MailGunClient {
  constructor(
    public emailPayload: EmailPayload,
    protected apikey = process.env.MAILGUM_APIKEY,
    protected endPoint = process.env.MAILGUM_ENDPOINT,
    protected clientResponse: ClientResponse = new ClientResponse()
  ) {}

  public async processEmail() {
    if (!this.apikey) {
      let message: object = {
        method: "MailGunClient::processEmail",
        message: "API Key is mandatory.",
      };
      console.error(message);
      this.clientResponse.setError(message, 500);
    }

    if (!this.endPoint) {
      let message: object = {
        method: "MailGunClient::processEmail",
        message: "EndPoint is mandatory.",
      };
      console.error(message);
      this.clientResponse.setError(message, 500);
    }

    //Preparing Email Payload which will be sent to MailGun
    let carbonCopy: string[] = [];
    let blindCarbonCopy: string[] = [];

    const recipient: string[] = this.getRecipient(this.emailPayload.to);
    const emailText: string = this.emailPayload.body;

    if (this.emailPayload.cc) {
      carbonCopy = this.getRecipient(this.emailPayload.cc);
    }

    if (this.emailPayload.bcc) {
      blindCarbonCopy = this.getRecipient(this.emailPayload.bcc);
    }

    const emailData: string = qs.stringify({
      from: this.emailPayload.from.name
        ? `${this.emailPayload.from.name} <${this.emailPayload.from.email}>`
        : this.emailPayload.from.email,
      to: recipient.join(),
      cc: carbonCopy && carbonCopy.length > 0 ? carbonCopy.join() : undefined,
      bcc:
        blindCarbonCopy && blindCarbonCopy.length > 0
          ? blindCarbonCopy.join()
          : undefined,
      subject: this.emailPayload.subject,
      text: emailText,
    });

    return await this.doRequest(emailData);
  }

  public getRecipient(values: Sender[]) {
    return values.map((value) => {
      return value.name ? `${value.name} <${value.email}>` : value.email;
    });
  }

  //Function to perfrom the API Call
  private async doRequest(data: string) {
    if (this.endPoint && this.apikey) {
      try {
        const response: AxiosResponse<any> = await axios.post(
          this.endPoint,
          data,
          {
            auth: {
              username: "api",
              password: this.apikey,
            },
          }
        );
        if (response && response.status === 200) {
          console.debug(response.status);
          console.debug("MailGun client was successful");
          this.clientResponse.successResponse({
            status: "Succeess",
            message: "Queued. Thank you.",
          });
        }
      } catch (error) {
        console.error("Error is", error);

        const errorCode: number = error.response.status;

        switch (errorCode) {
          case 400:
            this.clientResponse.setError(
              {
                status: "error",
                errorType: "Request body",
                message: "Please check the API request struct",
              },
              400
            );
            break;
          case 401:
            this.clientResponse.setError(
              {
                status: "error",
                errorType: "AUTH Error",
                message: "Please check the API key",
              },
              401
            );
            break;
          default:
            this.clientResponse.setError(
              {
                status: "error",
                message: "Falling back to Secondary service",
              },
              500
            );
        }
      } finally {
        return this.clientResponse;
      }
    }
  }
}

export default MailGunClient;

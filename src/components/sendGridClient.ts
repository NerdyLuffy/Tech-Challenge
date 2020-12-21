import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import "dotenv/config";
import EmailPayload from "../utils/emailPayload";
import ClientResponse from "../utils/clientResponse";

class SendGridClient {
  constructor(
    public emailPayload: EmailPayload,
    protected apikey = process.env.SENDGRID_APIKEY,
    protected endPoint = process.env.SENDGRID_ENDPOINT,
    protected clientResponse: ClientResponse = new ClientResponse()
  ) {}

  public async processEmail() {
    if (!this.apikey) {
      let message: object = {
        method: "SendGridClient::processEmail",
        message: "API Key is mandatory.",
      };
      console.error(message);
      this.clientResponse.setError(message, 500);
    }

    if (!this.endPoint) {
      let message: object = {
        method: "SendGridClient::processEmail",
        message: "EndPoint is mandatory.",
      };
      console.error(message);
      this.clientResponse.setError(message, 500);
    }

    //Preparing Email Payload which will be sent to sendGrid
    const data: string = JSON.stringify({
      personalizations: [
        {
          to: [...this.emailPayload.to],
          cc: this.emailPayload.cc ? [...this.emailPayload.cc] : undefined,
          bcc: this.emailPayload.bcc ? [...this.emailPayload.bcc] : undefined,
        },
      ],
      from: this.emailPayload.from,
      subject: this.emailPayload.subject
        ? this.emailPayload.subject
        : undefined,
      content: [
        {
          type: "text/plain",
          value: this.emailPayload.body,
        },
      ],
    });

    const headers: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${this.apikey}`,
        "Content-Type": "application/json",
      },
    };

    return await this.doRequest(data, headers);
  }

  //Function to perfrom the API Call
  private async doRequest(data: string, headers: object) {
    if (this.endPoint) {
      try {
        const response: AxiosResponse = await axios.post(
          this.endPoint,
          data,
          headers
        );
        if (response && response.status === 202) {
          console.debug(response.status);
          console.debug("SendGrid client was successful");
          this.clientResponse.successResponse({
            status: "Succeess",
            message: "Queued. Thank you.",
          });
        }
      } catch (error) {
        console.error("Error is", error);

        if (error.response.status === 403) {
          this.clientResponse.setError(
            {
              status: "error",
              errorType: "Form Field",
              message: "Please use yashsk@protonmail.com in the form field.",
            },
            400
          );
        } else if (error.response.status === 401) {
          this.clientResponse.setError(
            {
              status: "error",
              errorType: "AUTH Error",
              message: "Please check the API key",
            },
            401
          );
        } else if (error.response.status === 400) {
          this.clientResponse.setError(
            {
              status: "error",
              errorType: "Request body",
              message: "Please check the API request struct",
            },
            400
          );
        } else {
          this.clientResponse.setError(
            {
              status: "error",
              message: "Unable to deliver the email.",
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

export default SendGridClient;

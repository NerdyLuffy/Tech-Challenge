import EmailClient from "../src/components/emailClient";
import mockResponse from "./responses/input";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("EmailClient Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("When MailGun is successful, the client shouldn't call SendGrid", async () => {
    let client = new EmailClient(mockResponse.userInput);
    mockedAxios.post.mockResolvedValue({ status: 200 });
    const response = await client.sendEmail();

    const successResponse = {
      status: "Succeess",
      message: "Queued. Thank you.",
    };

    if (response) {
      expect(response?.message).toStrictEqual(successResponse);
      expect(mockedAxios.post).toBeCalled();
      expect(mockedAxios.post).toBeCalledTimes(1);
    }
  });

  it("When MailGun is un-successful, the client should call SendGrid", async () => {
    let client = new EmailClient(mockResponse.userInput);
    mockedAxios.post
      .mockRejectedValueOnce({
        response: { status: 500 },
      })
      .mockResolvedValueOnce({ status: 202 });

    const response = await client.sendEmail();

    const successResponse = {
      status: "Succeess",
      message: "Queued. Thank you.",
    };

    if (response) {
      expect(response?.message).toStrictEqual(successResponse);
      expect(mockedAxios.post).toBeCalled();
      expect(mockedAxios.post).toBeCalledTimes(2);
    }
  });
});

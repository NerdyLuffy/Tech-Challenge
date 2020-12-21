import MailGunClient from "../src/components/mailGunClient";
import mockResponse from "./responses/input";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("MailGunClient Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should be able to parse recipients from the array", () => {
    let client = new MailGunClient(mockResponse.userInput);
    const reponse = client.getRecipient(mockResponse.recipientsArray);
    expect(reponse).toEqual(mockResponse.parsedResponse);
  });

  it("Should be able to call the endPoint", async () => {
    let client = new MailGunClient(mockResponse.userInput);
    mockedAxios.post.mockResolvedValue({ status: 200 });
    const response = await client.processEmail();
    const successResponse = {
      status: "Succeess",
      message: "Queued. Thank you.",
    };
    expect(response?.message).toStrictEqual(successResponse);
    expect(mockedAxios.post).toBeCalled();
    expect(mockedAxios.post).toBeCalledTimes(1);
  });

  const errorScenarios = [
    {
      message: "auth error",
      statusCode: 401,
      errorMessage: {
        status: "error",
        errorType: "AUTH Error",
        message: "Please check the API key",
      },
    },
    {
      message: "body error",
      statusCode: 400,
      errorMessage: {
        status: "error",
        errorType: "Request body",
        message: "Please check the API request struct",
      },
    },
    {
      message: "server error",
      statusCode: 500,
      errorMessage: {
        status: "error",
        message: "Falling back to Secondary service",
      },
    },
  ];

  errorScenarios.forEach((test) => {
    it(`Should return error to client when API resturns ${test.message}`, async () => {
      let client = new MailGunClient(mockResponse.userInput);
      mockedAxios.post.mockRejectedValue({
        response: { status: test.statusCode },
      });
      const response = await client.processEmail();

      expect(response?.message).toStrictEqual(test.errorMessage);
      expect(mockedAxios.post).toBeCalled();
      expect(mockedAxios.post).toBeCalledTimes(1);
    });
  });
});

import SendGridClient from "../src/components/sendGridClient";
import mockResponse from "./responses/input";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SendGridClient Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should be able to call the endPoint", async () => {
    let client = new SendGridClient(mockResponse.userInput);
    mockedAxios.post.mockResolvedValue({ status: 202 });
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
      message: "field error",
      statusCode: 403,
      errorMessage: {
        status: "error",
        errorType: "Form Field",
        message: "Please use yashsk@protonmail.com in the form field.",
      },
    },
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
      message: "request body error",
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
        message: "Unable to delivery the email.",
      },
    },
  ];

  errorScenarios.forEach((test) => {
    it(`Should return error to client when API resturns ${test.message}`, async () => {
      let client = new SendGridClient(mockResponse.userInput);
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

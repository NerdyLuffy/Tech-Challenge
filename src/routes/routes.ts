import express, { Request, Response, Router } from "express";
import "dotenv/config";
import EmailClient from "../components/emailClient";

const emailRouter: Router = express.Router();

emailRouter.post("/", async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send({
      status: "error",
      errorType: "Body",
      message: "Body is required",
    });
  }

  const emailClient: EmailClient = new EmailClient(req.body);
  const response = await emailClient.sendEmail();

  if (response && response.isSuccessful) {
    res.send(response.message);
  } else {
    if (response && response.status && response.isSuccessful === false) {
      res.status(response.status).send(response.message);
    }
  }
});

export default emailRouter;

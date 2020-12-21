import Sender from "./sender";

type EmailPayload = {
  to: Sender[];
  from: Sender;
  cc?: Sender[];
  bcc?: Sender[];
  subject?: string;
  body: string;
};

export default EmailPayload;

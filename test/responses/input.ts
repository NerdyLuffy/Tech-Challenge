import EmailPayload from "../../src/utils/emailPayload";
import Sender from "../../src/utils/sender";

const userInput: EmailPayload = {
  to: [{ name: "yash", email: "yashkaramchandani23@gmail.com" }],
  cc: [
    {
      name: "Nerdy Luffy",
      email: "yash@veyasoft.com",
    },
  ],
  bcc: [
    {
      name: "Nerdy Luffy",
      email: "yash@veyasoft.com",
    },
  ],
  from: {
    name: "Nerdy Luffy",
    email: "yashsk@protonmail.com",
  },
  subject: "Testing via API",
  body: "Email client integration",
};

const recipientsArray: Sender[] = [
  {
    name: "user1",
    email: "yash@veyasoft.com",
  },
  {
    name: "user2",
    email: "yash@veyasoft.com",
  },
  {
    name: "user3",
    email: "yash@veyasoft.com",
  },
];

const parsedResponse: string[] = [
  "user1 <yash@veyasoft.com>",
  "user2 <yash@veyasoft.com>",
  "user3 <yash@veyasoft.com>",
];

const _ = {
  userInput,
  recipientsArray,
  parsedResponse,
};

export default _;

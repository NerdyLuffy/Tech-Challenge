# Tech-Challenge

Abstraction service between two different email service providers.

# Project Setup

- Clone the projects
- Add `.env` file
- run the following command in your terminal
  ```
  npm install &&  npm run start
  ```

# Test

- Run the following command in your terminal

```
npm run test
```

- To check the code coverage run the follwoing command in your terminal

```
npm run test-coverage
```

# API Overview

<image alt="email-abstraction-service" src="documents/email-abstraction-sservice.png">

# Environment Variables

| Key               | Value                                           |
| ----------------- | ----------------------------------------------- |
| PORT              | The Port on which Application should be started |
| MAILGUM_ENDPOINT  | MailGun API Endpoint                            |
| MAILGUM_APIKEY    | MailGun API Key                                 |
| SENDGRID_ENDPOINT | SendGrid API Endpoint                           |
| SENDGRID_APIKEY   | SendGrid API Key                                |

# Tech-Challenge

Abstraction service between two different email service providers.

# Project Setup

- Clone the projects
- Add `.env` file. Please refer Env Variable section over [here](https://github.com/NerdyLuffy/Tech-Challenge/tree/Dev#environment-variables)
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

# Notes/TODO

- Add more code coverage :see_no_evil: as present repo is only for demonstration purpose.
- As of now the API will always consider `MailGun` as primary provider, update the function to check with external services, config or Database to update the priority on the :airplane:.
- Integration with the Splunk or log management tool :notebook_with_decorative_cover:.
- User input validation :thinking:.

# How to add Additional Providers

- Create a `client` file for each new provider.
- Update `emailClient` file to add the new provider.
- Update the logic loop based on the requirement.
- Most importantly, don't forget to add in test cases to make sure new provider and existing things are still functional.
- Push the code in new branch and create the PR.

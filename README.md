
# EmailCLZ

EmailCLZ is a Next.js and TypeScript project that authenticates users using Google OAuth and accesses their emails with read-only permissions. The application leverages the GPT-4 model from OpenAI to classify emails into different categories, ensuring a secure and efficient way to manage and organize your inbox.




## Run Locally

Clone the project

```bash
  git clone https://github.com/YashSrivastava26/email-classifier
```

Go to the project directory

```bash
  cd email-classifier
```

Install dependencies

```bash
  npm install
  # or
  yarn install
  # or
  pnpm install
```

Start the server

```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
```

Open http://localhost:3000 with your browser to see the result.

### Update Redirect URI
If you're running the project locally, you need to update the redirect_uri in the /app/page.tsx file. Please change the redirect_uri to:

```bash
  redirect_uri: "http://localhost:3000/home
```

## API Reference

#### Get user info

```
  GET /api/user_info
```
This API endpoint retrieves user data. It requires an authorization header to be included in the request to authenticate the user.

#### Get item

```
  POST /api/list_mail
```
This API endpoint retrieves a list of mail items. It requires a parameter to specify the maximum number of results to fetch.

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `maxResult`      | `number` | **Required**. Maximum number of results to fetch. Must be a number between 1 and 20. |


```https
  POST /api/classify
```
This API endpoint classifies emails using the OpenAI API. It accepts an email object and an OpenAI API key in the request body to perform the classification.

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `number` | **Required**. Your OpenAI API key |
| `mail`      | `emailType ` | **Required**. Array of emails for classification |

## Types

#### emailType

The `emailType` represents the structure of an email object. It includes the following fields:
```
type emailType = {
    id: string;
    snippet: string;
    subject: string;
    from: string;
    category?: string | undefined;
}
```
#### userType

The `emailType` represents the structure of an user object. It includes the following fields:

```
type userType = {
  name: string;
  picture: string;
  email: string;
};

```

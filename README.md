# Smart Brain - API ⚙️

The back-end REST API for the Smart Brain application. This Node.js/Express server handles user authentication, manages database connections, and securely communicates with the Hugging Face Inference API to keep sensitive access tokens hidden from the client side.

## Features

- User registration and sign: stores credentials in PostgreSQL and hashes passwords with bcrypt
- Entry tracking: increments a user's image submission count after a successful detection
- Server-side model calls: sends images to Hugging Face and returns detections to the client
- CORS-enabled: ready to pair with the Smart Brain frontend

## Built with

- Node.js (ES modules)
- Express.js
- PostgreSQL
- Knex.js
- bcrypt-nodejs
- Hugging Face Inference API
- dotenv

## Prerequisites

- [Node.js](https://nodejs.org/) and npm
- PostgreSQL running locally
- A Hugging Face account and [access token](https://huggingface.co/settings/tokens)

The API listens on [http://localhost:3000](http://localhost:3000). `npm start` runs the app with nodemon.

## API endpoints

| Method | Path           | Body / params               | Description                                                                       |
| ------ | -------------- | --------------------------- | --------------------------------------------------------------------------------- |
| `GET`  | `/`            | —                           | Health check; responds with `"success"`                                           |
| `POST` | `/register`    | `{ email, name, password }` | Creates a user and login row; returns the new user                                |
| `POST` | `/signin`      | `{ email, password }`       | Authenticates and returns the user                                                |
| `GET`  | `/profile/:id` | `id` in the URL             | Returns a user by id                                                              |
| `PUT`  | `/image`       | `{ id }`                    | Increments `entries` and returns the new count                                    |
| `POST` | `/imageurl`    | `{ input }`                 | `input` is an image URL; proxies the image to Hugging Face and returns detections |

This project was developed during the Zero To Mastery - Complete Web Developer Bootcamp.

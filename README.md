# Random User Explorer

A modern web application to explore random user profiles, country information, currency exchange rates, and the latest news headlines. Built with Node.js, Express, and public APIs.

[![Live on Fly.io](https://www.fly.io/public/images/flyio-badge.svg)](https://random-user-explorer-cipjtw.fly.dev/)

## Live Demo

**Try it here:** [random-user-explorer-cipjtw.fly.dev](https://random-user-explorer-cipjtw.fly.dev/)

---

## Features

- Generate a random user profile (name, photo, email, city, country, address, etc.)
- View detailed country information (flag, capital, languages, currency)
- See currency exchange rates (to USD and KZT)
- Read the latest news headlines for the user's country
- Clean, responsive, and modern UI

---

## Technologies Used

- **Node.js** — JavaScript runtime
- **Express** — Web server framework
- **Axios** — HTTP client for API requests
- **dotenv** — Environment variable management
- **HTML5/CSS3** — Frontend UI
- **Vanilla JavaScript** — Frontend logic
- **REST Countries API** — Country info
- **RandomUser API** — Random user data
- **ExchangeRate API** — Currency rates
- **NewsAPI** — Latest news headlines
- **Fly.io** — Cloud deployment
- **Docker** — Containerization (optional)

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/commedeschamps/random-user-explorer.git
cd random-user-explorer
```

### 2. Set up environment variables

Create a `.env` file in the root directory:

```
EXCHANGERATE_API_KEY=your_exchangerate_api_key
NEWS_API_KEY=your_newsapi_key
```

### 3. Install dependencies

```sh
npm install
```

### 4. Run locally

```sh
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000) (or the port you set).

---

## Deployment

### Deploy to Fly.io

1. [Install Fly CLI](https://fly.io/docs/hands-on/install-flyctl/)
2. Authenticate: `fly auth login`
3. Launch the app:
   ```sh
   fly launch
   fly deploy
   ```
4. Set your environment variables on Fly.io dashboard or with `fly secrets set`.

### Docker

You can also build and run the app with Docker:

```sh
docker build -t random-user-explorer .
docker run -p 3000:3000 --env-file .env random-user-explorer
```

---

## License

MIT

---

**Repository:** [github.com/commedeschamps/random-user-explorer](https://github.com/commedeschamps/random-user-explorer)

# Random User Explorer

A modern web application to explore random user profiles, country information, currency exchange rates, maps, and the latest news headlines. Built with Node.js, Express, and public APIs.

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

- **Node.js** - JavaScript runtime
- **Express** - Web server framework
- **Axios** - HTTP client for API requests
- **dotenv** - Environment variable management
- **HTML5/CSS3** - Frontend UI
- **Vanilla JavaScript** - Frontend logic
- **REST Countries API** - Country info
- **RandomUser API** - Random user data
- **ExchangeRate API** - Currency rates
- **NewsAPI** - Latest news headlines
- **Fly.io** - Cloud deployment
- **Docker** - Containerization (optional)

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
PORT=3000
```

`PORT` is optional. If not set, the server defaults to 8080.

### 3. Install dependencies

```sh
npm install
```

### 4. Run locally

```sh
npm start
```

The app will be available at [http://localhost:8080](http://localhost:8080) by default (or the `PORT` you set).

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

## API Usage Details

### 1. Random User Generator API
- Endpoint: `https://randomuser.me/api/`
- Used to fetch a random user's personal and location details (first name, last name, gender, profile picture, age, date of birth, city, country, address).
- Called from the backend (`server.js`), not from the frontend.

### 2. Country Info API (REST Countries)
- Endpoint: `https://restcountries.com/v3.1/name/{country}`
- Used to fetch country name, capital, official languages, currency, and flag based on the user's country.
- No API key required.

### 3. Exchange Rate API
- Endpoint: `https://v6.exchangerate-api.com/v6/{API_KEY}/latest/{currency}`
- Used to fetch exchange rates for the user's currency to USD and KZT.
- API key is stored in `.env`.

### 4. News API
- Endpoint: `https://newsapi.org/v2/everything`
- Used to fetch 5 latest news headlines in English related to the user's country.
- API key is stored in `.env`.

---

## Key Design Decisions

- **Server-side API Calls:** All API requests are made on the server (Node.js/Express) for security and to keep API keys hidden. The frontend only receives cleaned, relevant data.
- **Separation of Concerns:** All business logic (API calls, data processing) is implemented in `server.js`. The frontend (`frontend.js`) is responsible only for displaying data and handling user interactions.
- **Environment Variables:** All sensitive API keys are stored in a `.env` file and never hardcoded.
- **Error Handling:** The server gracefully handles missing or unavailable data from APIs and sends only valid, cleaned data to the frontend.
- **Responsive UI:** The frontend uses modern HTML/CSS for a clean, responsive, and user-friendly interface. Data is displayed in cards and structured sections.
- **Project Structure:**
  - `server.js`: Main backend logic and API integration
  - `public/`: Static frontend assets (JS, CSS)
  - `views/`: HTML templates
  - `.env`: Environment variables (not committed)
  - `package.json`: Project metadata and dependencies

---

## License

MIT

---

**Repository:** [github.com/commedeschamps/random-user-explorer](https://github.com/commedeschamps/random-user-explorer)

const axios = require("axios");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

async function getCountryInfo(countryName) {
    try {
        const response = await axios.get(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`
        );
        
        const c = response.data[0];
        const languages = c.languages ? Object.values(c.languages) : [];
        
        let currency = "N/A";
        if (c.currencies) {
            const currencyKey = Object.keys(c.currencies)[0];
            currency = `${c.currencies[currencyKey].name} (${currencyKey})`;
        }

        const currencyCode = c.currencies ? Object.keys(c.currencies)[0] : null;

        return {
            name: c.name.common,
            capital: c.capital ? c.capital[0] : "N/A",
            languages: languages,
            currency: currency,
            currencyCode: currencyCode,
            flag: c.flags.png
        };

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        return null;
    }
}

async function getExchangeRates(currencyCode) {
    const apiKey = process.env.EXCHANGERATE_API_KEY;
    
    if (!currencyCode) {
        return null;
    }
    
    try {
        const response = await axios.get(
            `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currencyCode}`
        );
        
        const rates = response.data.conversion_rates;
        
        return {
            baseCurrency: currencyCode,
            toUSD: rates.USD ? rates.USD.toFixed(2) : "N/A",
            toKZT: rates.KZT ? rates.KZT.toFixed(2) : "N/A"
        };
        
    } catch (error) {
        return null;
    }
}

async function getNews(countryName) {
    const apiKey = process.env.NEWS_API_KEY;
    
    if (!countryName || !apiKey) {
        return null;
    }
    
    try {
        const response = await axios.get(
            `https://newsapi.org/v2/everything`, {
                params: {
                    q: countryName,
                    language: 'en',
                    pageSize: 5,
                    sortBy: 'publishedAt'
                },
                headers: {
                    'X-Api-Key': apiKey
                }
            }
        );
        
        if (response.data.articles && response.data.articles.length > 0) {
            return response.data.articles.map(article => ({
                title: article.title,
                description: article.description,
                image: article.urlToImage,
                url: article.url,
                source: article.source.name
            }));
        }
        
        return [];
        
    } catch (error) {
        return null;
    }
}

app.get("/api/user", async (req, res) => {
    try {
        const apiResponse = await axios.get("https://randomuser.me/api/");
        const userData = apiResponse.data.results[0];

        const user = {
            firstName: userData.name.first,
            lastName: userData.name.last,
            gender: userData.gender,
            profilePicture: userData.picture.large,
            age: userData.dob.age,
            dateOfBirth: userData.dob.date,
            email: userData.email,
            city: userData.location.city,
            country: userData.location.country,
            address: `${userData.location.street.number} ${userData.location.street.name}`
        };

        const [countryInfo, news] = await Promise.all([
            getCountryInfo(user.country),
            getNews(user.country)
        ]);
        
        let exchangeRates = null;
        if (countryInfo && countryInfo.currencyCode) {
            exchangeRates = await getExchangeRates(countryInfo.currencyCode);
        }

        res.json({
            user: user,
            country: countryInfo,
            exchangeRates: exchangeRates,
            news: news
        });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});


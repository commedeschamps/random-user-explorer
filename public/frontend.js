const emptyState = document.getElementById("emptyState");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const result = document.getElementById("result");
const btnGenerate = document.getElementById("btn");
const btnRefresh = document.getElementById("btnRefresh");

async function fetchUser() {
    emptyState.classList.add("hidden");
    loading.classList.remove("hidden");
    error.classList.add("hidden");
    result.classList.add("hidden");
    
    try {
        const res = await fetch("/api/user");
        
        if (!res.ok) {
            throw new Error("Failed to fetch user data");
        }
        
        const data = await res.json();
        
        document.getElementById("profilePicture").src = data.user.profilePicture;
        document.getElementById("fullName").textContent = `${data.user.firstName} ${data.user.lastName}`;
        document.getElementById("email").textContent = data.user.email;
        document.getElementById("gender").textContent = capitalizeFirst(data.user.gender);
        document.getElementById("age").textContent = data.user.age;
        document.getElementById("dateOfBirth").textContent = formatDate(data.user.dateOfBirth);
        document.getElementById("city").textContent = data.user.city;
        document.getElementById("country").textContent = data.user.country;
        document.getElementById("address").textContent = data.user.address;

        if (data.country) {
            document.getElementById("countryFlag").src = data.country.flag;
            document.getElementById("countryName").textContent = data.country.name;
            document.getElementById("capital").textContent = data.country.capital || "N/A";
            document.getElementById("languages").textContent = data.country.languages.join(", ") || "N/A";
            document.getElementById("currency").textContent = data.country.currency || "N/A";
        } else {
            document.getElementById("countryFlag").src = "";
            document.getElementById("countryName").textContent = data.user.country;
            document.getElementById("capital").textContent = "N/A";
            document.getElementById("languages").textContent = "N/A";
            document.getElementById("currency").textContent = "N/A";
        }
        
        if (data.exchangeRates) {
            const base = data.exchangeRates.baseCurrency;
            document.getElementById("exchangeUSD").textContent = `1 ${base} = ${data.exchangeRates.toUSD}`;
            document.getElementById("exchangeKZT").textContent = `1 ${base} = ${data.exchangeRates.toKZT}`;
        } else {
            document.getElementById("exchangeUSD").textContent = "N/A";
            document.getElementById("exchangeKZT").textContent = "N/A";
        }
        
        displayNews(data.news, data.user.country);
        
        loading.classList.add("hidden");
        result.classList.remove("hidden");
        
    } catch (err) {
        loading.classList.add("hidden");
        error.classList.remove("hidden");
        error.textContent = "Error: " + err.message;
    }
}

btnGenerate.addEventListener("click", fetchUser);
btnRefresh.addEventListener("click", fetchUser);

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayNews(news, countryName) {
    const container = document.getElementById("newsContainer");
    
    if (!news || news.length === 0) {
        container.innerHTML = `
            <div class="news-empty">
                <i class="fa fa-newspaper"></i>
                <p>No news found for ${countryName}</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = news.map(article => `
        <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="news-article">
            <div class="news-image">
                ${article.image 
                    ? `<img src="${article.image}" alt="" onerror="this.parentElement.innerHTML='<i class=\\'fa fa-image\\'></i>'">` 
                    : '<i class="fa fa-image"></i>'
                }
            </div>
            <div class="news-content">
                <h5 class="news-title">${article.title || 'No title'}</h5>
                <p class="news-description">${article.description || 'No description available'}</p>
                <span class="news-source">
                    <i class="fa fa-external-link"></i>
                    ${article.source || 'Unknown source'}
                </span>
            </div>
        </a>
    `).join('');
}

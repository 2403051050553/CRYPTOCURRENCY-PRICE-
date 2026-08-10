const coinInput = document.getElementById("coinInput");
const searchBtn = document.getElementById("searchBtn");
const refreshBtn = document.getElementById("refreshBtn");
const errorMsg = document.getElementById("errorMsg");
const singleResult = document.getElementById("singleResult");
const coinTableBody = document.getElementById("coinTableBody");

window.addEventListener("load", loadTopCoins);

searchBtn.addEventListener("click", searchCoin);
refreshBtn.addEventListener("click", loadTopCoins);
coinInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchCoin();
  }
});

// Search a single coin by name
function searchCoin() {
  const coin = coinInput.value.trim().toLowerCase();

  errorMsg.textContent = "";
  singleResult.style.display = "none";

  if (coin === "") {
    errorMsg.textContent = "Please enter a coin name.";
    return;
  }

  const url = "https://api.coingecko.com/api/v3/simple/price?ids=" + coin +
    "&vs_currencies=usd&include_24hr_change=true";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data[coin]) {
        errorMsg.textContent = "Coin not found. Try full name, e.g. 'ethereum'.";
        return;
      }

      const price = data[coin].usd;
      const change = data[coin].usd_24h_change;

      showSingleCoin(coin, price, change);
    })
    .catch(function () {
      errorMsg.textContent = "Something went wrong. Check your internet connection.";
    });
}

function showSingleCoin(coin, price, change) {
  const changeClass = change >= 0 ? "positive" : "negative";
  const changeSign = change >= 0 ? "+" : "";

  singleResult.innerHTML =
    "<h3>" + coin.toUpperCase() + "</h3>" +
    "<p>Price: $" + price.toLocaleString() + "</p>" +
    "<p class='" + changeClass + "'>24h Change: " + changeSign + change.toFixed(2) + "%</p>";

  singleResult.style.display = "block";
}

// Load top 10 coins by market cap
function loadTopCoins() {
  errorMsg.textContent = "";
  coinTableBody.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";

  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      coinTableBody.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        const coin = data[i];
        const change = coin.price_change_percentage_24h;
        const changeClass = change >= 0 ? "positive" : "negative";
        const changeSign = change >= 0 ? "+" : "";

        const row = document.createElement("tr");
        row.innerHTML =
          "<td>" + (i + 1) + "</td>" +
          "<td>" + coin.name + " (" + coin.symbol.toUpperCase() + ")</td>" +
          "<td>$" + coin.current_price.toLocaleString() + "</td>" +
          "<td class='" + changeClass + "'>" + changeSign + change.toFixed(2) + "%</td>";

        coinTableBody.appendChild(row);
      }
    })
    .catch(function () {
      errorMsg.textContent = "Could not load coin list. Try refresh again.";
      coinTableBody.innerHTML = "";
    });
}

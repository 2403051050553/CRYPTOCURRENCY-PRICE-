# Cryptocurrency Price Tracker

A browser-based dashboard for checking cryptocurrency prices in USD. The page uses CoinGecko's public API to show the top 10 coins by market capitalization and to look up an individual coin by ID.

## Features

- Top 10 market-cap list with current USD price and 24-hour change
- Search by CoinGecko coin ID, such as `bitcoin` or `ethereum`
- Refresh control and basic loading/error feedback

## Built with

- HTML
- CSS
- Vanilla JavaScript
- CoinGecko public API

## Run locally

Open `index.html` in a modern browser with internet access. The app makes requests to CoinGecko; availability and rate limits are controlled by that service.

## Project files

- `index.html` — dashboard markup
- `style.css` — visual styling
- `script.js` — API requests and rendering

## Scope

Prices are fetched in USD. This is an informational front-end project, not a trading service or financial advice.

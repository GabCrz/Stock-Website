// API KEY
const API_KEY = "9UPOF1ERW8WZ33WE";

async function fetchStockData(symbol, elementId) {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

    try {
        // Fetch stock information from Alpha Vantage
        const response = await fetch(url);
        const data = await response.json();
        console.log("API Response:", data);

        // Display error message if reached daily limit
        if (data.Note) {
            document.getElementById(elementId).innerHTML = `
                <p>API Rate Limit Reached (25/Day). Please try again later.</p>
            `;
            return;
        }

        // Return latest global price
        const globalQuote = data['Global Quote'];
        const price = globalQuote && globalQuote['05. price'];

        if (!data['Global Quote'] || !data['Global Quote']['05. price']) {
            throw new Error("Invalid response from Alpha Vantage");
        }

        // Insert paragraphs containing stock symbol and price inside stock-box 
        document.getElementById(elementId).innerHTML = `
            <p>Symbol: ${symbol}</p>
            <p>Price: $${price}</p>
        `;       
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById(elementId).innerHTML = `
            <p>Error: Unable to fetch data for symbol ${symbol}</p>
        `;
    }
}
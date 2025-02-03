import Crypto from "../models/cryptoModel.js";
import User from "../models/userModel.js";
import axios from "axios";

export const getCrypto = async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');

        const coins = response.data.map((coin) => ({
            id: coin.id,
            symbol: coin.symbol,
            image: coin.image,
            current_price: coin.current_price ?? 0,
            priceChange1h: coin.price_change_percentage_1h_in_currency ?? 0,
            priceChange24h: coin.price_change_percentage_24h_in_currency ?? 0,
            priceChange7d: coin.price_change_percentage_7d_in_currency ?? 0,
            market_cap: coin.market_cap ?? 0,
            total_volume: coin.total_volume ?? 0,
            volume24h: coin.total_volume ?? 0,
            circulating_supply: coin.circulating_supply ?? 0,
            max_supply: coin.max_supply ?? 0,
            last_updated: coin.last_updated ?? "N/A"
        }));

        return res.status(200).json(coins);
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({ message: "Unable to fetch cryptocurrency data" });
    }
}
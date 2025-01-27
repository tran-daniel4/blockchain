import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    market_cap: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    circulating_supply: {
        type: Number,
        required: true
    },
    max_supply: {
        type: Number,
        required: true
    },
    last_updated: {
        type: Date,
        required: true
    }
})

const Crypto = new mongoose.model("Crypto", cryptoSchema);
export default Crypto;

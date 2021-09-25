const mongoose = require("mongoose")
const expertSchema = new mongoose.Schema(
    {
        expert_name: {
            type: String,
            required: 'Please enter your expert name'
        },
        address: {
            type: String,
            required: 'Please enter your address',
            default: '100 Street, Australia'
        },
        phone_number: {
            type: Number,
            default: 123
        },
        password: {
            type: Number,
            default: 000
        }
    }
)

module.exports = mongoose.model("Expert", expertSchema);
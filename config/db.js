const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb+srv://vaibhzz:smiley@cluster0.1upoi.mongodb.net/FoodDelivery?retryWrites=true&w=majority");

module.exports = {
    connection
};
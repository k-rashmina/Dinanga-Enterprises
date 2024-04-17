const mongoose = require("mongoose");
const schema = mongoose.Schema;

const servicesProvidedSchema = new schema ({
    Services_list:{
        type: String,
        required: true,
    },

    Supplier_ID:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },


});

const services_provided = mongoose.model(
    "ServicesProvided",
    servicesProvidedSchema
);
module.exports = services_provided;
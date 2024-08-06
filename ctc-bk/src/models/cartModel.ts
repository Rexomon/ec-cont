import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Items",
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
});

const cartSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Users",
        },
        items: [cartItemSchema],
    },
    {
        timestamps: true,
    },
);

const cartModel = mongoose.model("Cart", cartSchema);
export default cartModel;

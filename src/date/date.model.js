import { Schema, model } from "mongoose";

const DateSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    keeper: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pet: {
        type: Schema.Types.ObjectId,
        ref: "Pet",
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model("DateModel", DateSchema);

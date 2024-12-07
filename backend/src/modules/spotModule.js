import mongoose from "mongoose";

const spotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hobby: { type: [String], default: [] },
    photo: { type: String, required: true },
    description: { type: String, required: true },
    coordinates: {
        type: [Number],
        required: true,
    },
    location: {
        type: {
            type: String,
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    },
    reviews: { type: [String], default: []},
    likes: { type: [String], default: []}
}, { timestamps: true });

spotSchema.index({ location: '2dsphere' });

export default mongoose.model("Spot", spotSchema);

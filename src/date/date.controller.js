import User from "../users/user.model.js";
import Pet from "../pet/pet.model.js";
import DateModel from "../date/date.model.js";

export const saveDate = async (req, res) => {
    try {
        const { email, name, ...rest } = req.body;
        
        const user = await User.findOne({ email });
        const pet = await Pet.findOne({ name });

        if (!user || !pet) {
            return res.status(404).json({
                success: false,
                message: "Owner or Pet not found!"
            });
        }

        const date = new DateModel({
            ...rest,
            keeper: user._id,
            pet: pet._id
        });

        await date.save();

        res.status(201).json({ success: true, date });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error saving date!", error });
    }
};

export const getDates = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { status: true };

        const [dates, total] = await Promise.all([
            DateModel.find(query).skip(Number(desde)).limit(Number(limite)),
            DateModel.countDocuments(query)
        ]);

        res.status(200).json({ success: true, total, dates });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error getting dates!", error });
    }
};

export const searchDate = async (req, res) => {
    try {
        const date = await DateModel.findById(req.params.id);

        if (!date) {
            return res.status(404).json({ success: false, message: "Date not found!" });
        }

        res.status(200).json({ success: true, date });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error searching date!", error });
    }
};

export const updateDate = async (req, res) => {
    try {
        const updatedDate = await DateModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedDate) {
            return res.status(404).json({ success: false, message: "Date not found!" });
        }

        res.status(200).json({ success: true, message: "Date updated!", date: updatedDate });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating date!", error });
    }
};

export const deleteDate = async (req, res) => {
    try {
        const date = await DateModel.findByIdAndUpdate(req.params.id, { status: false });
        
        if (!date) {
            return res.status(404).json({ success: false, message: "Date not found!" });
        }

        res.status(200).json({ success: true, message: "Date deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting date!", error });
    }
};

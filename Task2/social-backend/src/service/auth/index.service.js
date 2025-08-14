import User from "../../models/user/user.model.js";
import bcrypt from "bcrypt";
import { errorResponse } from "../../utils/response/response.js";
import userPayload from "../../utils/common/userPayload/userPayload.js";
const authService = {
    createUser: async ({ name, bio, interests, profilePictureUrl, password }) => {
        try {
            const user = new User({
                name, bio, interests, profilePictureUrl, password
            });
            const savedUser = await user.save();

            return ({ success: true, data: savedUser });
        } catch (error) {
            return ({ success: false, message: "User not created " })
        }
    },
    loginUser: async ({ name, password }) => {
        try {
            const user = await User.findOne({ name });
            if (!user) {
                return res.status(401).json(errorResponse("User Not Found"));
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json(errorResponse("Invalid credentials"));
            }
            const data = await userPayload(user);
            return { success: true, data }
        }
        catch (error) {
            return { success: false, message: "User not login" }
        }

    },
    getUser: async (id) => {
        try {
            const user = await User.findById(id).select("-password");
            if (!user) {
                return { success: false, message: "User not found" };
            }
            return { success: true, data: user };
        } catch (error) {
            return { success: false, message: "User not found" };
        }
    },

    updateUser: async (id, { name, bio, interests, profilePictureUrl }) => {
        try {
            const user = await User.findByIdAndUpdate(id, { name, bio, interests, profilePictureUrl }, { new: true });
            if (!user) {
                return { success: false, message: "User not found" };
            }
            return { success: true, data: user };
        } catch (error) {
            return { success: false, message: "User not found" };
        }
    }
}

export default authService;
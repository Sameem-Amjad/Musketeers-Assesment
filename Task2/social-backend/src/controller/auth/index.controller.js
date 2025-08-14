import authService from "../../service/auth/index.service.js";
import { dataResponse, errorResponse } from "../../utils/response/response.js"

const authController = {
    createUser: async (req, res) => {
        try {
            const { name, interests, bio, profilePictureUrl, password, confirmPassword } = req.body;
            // if (password != confirmPassword) {
            //     res.status(401).json(errorResponse("Password and confirm password did not match", 401));
            // }
            if (!name && !interests && !bio) {
                res.status(400).json(errorResponse("Please provide all the information", 400));
            }

            const resBody = await authService.createUser({ name, bio, interests, profilePictureUrl, password });
            if (resBody.success) {
                res.status(201).json(dataResponse("User Created Successfully", resBody?.data, 201));
            }
        } catch (error) {
            res.status(500).json(errorResponse(error || error?.message, 500));
        }
    },

    loginUser: async (req, res) => {
        try {
            const { name, password } = req.body;
            console.log(name, password);
            const resBody = await authService.loginUser({ name, password });
            if (resBody.success) {
                res.status(201).json(dataResponse("User Login Successfully", resBody?.data, 201));
            }
        } catch (error) {
            res.status(500).json(errorResponse(error || error?.message, 500));
        }
    },

    getUser: async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                return res.status(401).json(errorResponse("User not found", 401));
            }
            const resBody = await authService.getUser(user);
            res.status(200).json(dataResponse("User fetched successfully", resBody?.data, 200));
        } catch (error) {
            res.status(500).json(errorResponse(error || error?.message, 500));
        }
    },

    updateUser: async (req, res) => {
        try {
            const user = req.user;
            const { name, bio, interests, profilePictureUrl } = req.body;

            if (!user) {
                return res.status(401).json(errorResponse("User not found", 401));
            }

            const resBody = await authService.updateUser(user, { name, bio, interests, profilePictureUrl });
            res.status(200).json(dataResponse("User updated successfully", resBody?.data, 200));
        } catch (error) {
            res.status(500).json(errorResponse(error || error?.message, 500));
        }
    }
}
export default authController;
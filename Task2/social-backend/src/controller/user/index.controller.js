import userService from "../../service/user/index.service.js";
import { dataResponse } from "../../utils/response/response.js";

const userController = {
    searchUsers: async (req, res) => {
        const { q, limit, page } = req.query;

        try {
            const resBody = await userService.searchUsers(q, { limit, page });
            if (resBody.success) {
                res.status(200).json(dataResponse("Users found successfully", resBody.data, 200));
            } else {
                res.status(404).json(dataResponse("No users found", null, 404));
            }
        } catch (error) {
            res.status(500).json(dataResponse("Error searching users", null, 500));
        }
    },
    getFriendSuggestions: async (req, res) => {
        try {
            const userId = req.user;
            const suggestions = await userService.getFriendSuggestions(userId);
            if (suggestions.success) {
                res.status(200).json(dataResponse("Friend suggestions retrieved successfully", suggestions.data, 200));
            } else {
                res.status(404).json(dataResponse("No friend suggestions found", null, 404));
            }
        } catch (error) {
            res.status(500).json(dataResponse("Error retrieving friend suggestions", null, 500));
        }
    }
}

export default userController;
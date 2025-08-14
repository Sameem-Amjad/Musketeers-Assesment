import User from "../../models/user/user.model.js";
const userService = {
    searchUsers: async (query, { limit, page }) => {
        try {
            const users = await User.find({ name: { $regex: query, $options: "i" } })
                .limit(limit)
                .skip((page - 1) * limit);
            const total = await User.countDocuments({ name: { $regex: query, $options: "i" } });
            const totalPages = Math.ceil(total / limit);
            const hasNextPage = page < totalPages;
            return { success: true, data: { users, total, totalPages, hasNextPage } };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    getFriendSuggestions: async (userId, { limit = 10, page = 1 } = {}) => {
        try {
            const user = await User.findOne({ _id: userId });
            if (!user || !user.interests || user.interests.length === 0) {
                return { success: false, error: "User or interests not found" };
            }

            const query = {
                _id: { $ne: userId },
                interests: { $in: user.interests }
            };

            const users = await User.find(query)
                .limit(limit)
                .skip((page - 1) * limit);

            const total = await User.countDocuments(query);
            const totalPages = Math.ceil(total / limit);
            const hasNextPage = page < totalPages;

            return { success: true, data: { users, total, totalPages, hasNextPage } };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

export default userService;

import Chat from "../models/chat/chat.model.js";
import User from "../models/user/user.model.js";

const activeUsers = new Map();

export default function initSocket(io) {
    io.on("connection", (socket) => {

        socket.on("join", (userId) => {
            activeUsers.set(userId, socket.id);
            socket.userId = userId;
        });


        socket.on("private_message", async ({ toUserId, message }) => {
            const fromUserId = socket.userId;
            if (!fromUserId || !toUserId || !message) return;

            let chat = await Chat.findOne({
                participants: { $all: [fromUserId, toUserId], $size: 2 },
            });
            if (!chat) {
                chat = await Chat.create({ participants: [fromUserId, toUserId], messages: [] });
            }
            const msgObj = {
                sender: fromUserId,
                content: message,
            };
            chat.messages.push(msgObj);
            await chat.save();

            const toSocketId = activeUsers.get(toUserId);
            if (toSocketId) {
                io.to(toSocketId).emit("private_message", {
                    fromUserId,
                    message,
                });
            }
        });

        socket.on("follow", async ({ followerId, followeeId }) => {
            if (!followerId || !followeeId) return;
            await User.findByIdAndUpdate(followerId, { $addToSet: { following: followeeId } });
            await User.findByIdAndUpdate(followeeId, { $addToSet: { followers: followerId } });
            const toSocketId = activeUsers.get(followeeId);
            if (toSocketId) {
                io.to(toSocketId).emit("followed", { followerId });
            }
        });
        socket.on("unfollow", async ({ followerId, followeeId }) => {
            if (!followerId || !followeeId) return;
            await User.findByIdAndUpdate(followerId, { $pull: { following: followeeId } });
            await User.findByIdAndUpdate(followeeId, { $pull: { followers: followerId } });

            const toSocketId = activeUsers.get(followeeId);
            if (toSocketId) {
                io.to(toSocketId).emit("unfollowed", { followerId });
            }
        });

        socket.on("like_post", ({ postId, userId }) => {
            io.emit("post_liked", { postId, userId });
        });
        socket.on("comment_post", ({ postId, userId, comment }) => {
            io.emit("post_commented", { postId, userId, comment });
        });

        socket.on("disconnect", () => {
            if (socket.userId) {
                activeUsers.delete(socket.userId);
            }
        });
    });
}

export const conversationUsers = conversation => {
    if (conversation.user1.name === localStorage.getItem('USER_NAME')) {
        return {
            ...conversation,
            me: conversation.user1,
            other: conversation.user2
        };
    }
    return {
        ...conversation,
        other: conversation.user1,
        me: conversation.user2
    };
};
export const pendingUsers = conversation => {
    if (conversation.user1.name === localStorage.getItem('USER_NAME')) {
        return {
            ...conversation,
            me: conversation.user1,
            other: conversation.user2
        };
    }
    return {
        ...conversation,
        other: conversation.user1,
        me: conversation.user2
    };
};

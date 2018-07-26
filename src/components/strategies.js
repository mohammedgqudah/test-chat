export default server => {
    let rolesANDUsers = server.roles
        .map(roleObj => roleObj.name)
        .concat(server.users.map(user => user.user.name));
    return [
        {
            match: /(^|\s)@(\w+)$/,
            search: function(term, callback) {
                callback(
                    rolesANDUsers.filter(role => {
                        if (role == '') return true;
                        return role.toLowerCase().startsWith(term.toLowerCase());
                    }).map((e) => {
                        return `<img/>@${e}`
                    })
                );
            },
            replace: function(value) {
                return (
                    "$1" + value.split("/>")[1].replace(/\s/g, "") + '.'
                );
            }
        }
    ];
};

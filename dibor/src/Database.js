const users = [];

const addUser = (values) => {
    users.push({
        username: values.username,
        password: values.password,
        display: values.display,
        picture: values.picture,
    })
};

const userExists = (username, password) => {

    for (const i in users) {
        const user = users[i]
        if (username === user.username &&
            password === user.password)
            return true
    }
    return false
};

const getUser = (username) => {

    for (const i in users) {
        console.log(users[i])
        const user = users[i]
        if (username === user.username) {
            return user
        }
    }
    return null
};



export  {
    addUser,
    userExists,
    getUser
};
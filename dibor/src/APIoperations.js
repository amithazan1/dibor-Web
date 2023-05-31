const users = [];

const addUser = async (values) => {
    const { confirm, ...userValues } = values;
    const response = await fetch('http://localhost:12345/api/Users', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userValues })
    });
    if (!response.ok)
        return 0;
    return 1;
};

const login = async (values) => {
    const response = await fetch('http://localhost:12345/api/Tokens', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values })
    });
    if (!response.ok)
    {
        return 0;
    }
    return await response.text();

};

/*
const addUser = (values) => {
  
  users.push({
      username: values.username,
      password: values.password,
      display: values.display,
      picture: values.picture,
  })
});

const userExists = (username, password) => {

    for (const i in users) {
        const user = users[i]
        if (username === user.username &&
            password === user.password)
            return true
    }
    return false
};
*/

const getUser = (username) => {

    for (const i in users) {
        const user = users[i]
        if (username === user.username) {
            return user
        }
    }
    return null
};



export {
    addUser,
    login,
    getUser
};
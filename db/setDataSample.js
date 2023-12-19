const mockMangas = require('./mock-mangas')
const mockUsers = require('./mock-users')
const bcrypt = require('bcrypt')

const setMangas = (Manga) => {
    return Promise.all(mockMangas.map((element) => {
        const newManga = { ...element, id: null }
        return Manga.create(newManga)
            .then(() => { })
            .catch((error) => {
                console.log(error.message)
            })
    }))
}

const setUsers = (User) => {
    return Promise.all(mockUsers.map(user => {
        return bcrypt.hash(user.password, 10)
            .then(hashResult => {
                return User.create({ ...user, password: hashResult })
                    .then(() => { })
                    .catch((error) => {
                        console.log(error.message)
                    })
            })
    }))
}

const setRoles = (Role) => {
    return Promise.all([Role.create({ label: "superadmin" }), Role.create({ label: "admin" }), Role.create({ label: "edit" })])
}

module.exports = {setRoles, setUsers, setMangas}
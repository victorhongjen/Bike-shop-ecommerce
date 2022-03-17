import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Ben Brown',
        email: 'Ben@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Chris Chang',
        email: 'chris@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users

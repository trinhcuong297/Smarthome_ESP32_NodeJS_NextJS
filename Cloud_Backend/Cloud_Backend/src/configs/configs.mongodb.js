const dev = {
    username: 'trinhcuong297',
    password: 'caocuong297',
}
const prod = {
    username: 'trinhcuong297',
    password: 'caocuong297',
}


const config = { dev, prod }
const env = process.env.NODE_ENV || 'dev'

export const { username, password } = dev
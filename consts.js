require('dotenv').config({ path: './.env.secret' })

const INFURA_API_KEY = process.env.INFURA_API_KEY
const PRIMARY_PRIVATE_KEY = process.env.PRIMARY_PRIVATE_KEY

module.exports = { INFURA_API_KEY, PRIMARY_PRIVATE_KEY }
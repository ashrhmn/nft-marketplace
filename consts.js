require('dotenv').config({ path: './.env.secret' })

const INFURA_API_KEY = process.env.INFURA_API_KEY || ""
const PRIMARY_PRIVATE_KEY = process.env.PRIMARY_PRIVATE_KEY || "369b4e0fdb7dfe9cfb18327de973d709359a2b4ac45cd353d05df709ccd5f4d6"

module.exports = { INFURA_API_KEY, PRIMARY_PRIVATE_KEY }
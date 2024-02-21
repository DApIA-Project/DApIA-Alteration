const dotenv = require('dotenv')

dotenv.config({ path: '.env' })
const apiUrl = process.env.BASE_URL
export default apiUrl

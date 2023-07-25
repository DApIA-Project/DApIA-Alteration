const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://votre-api-prod.com'
    : 'http://localhost:3001'
export default apiUrl

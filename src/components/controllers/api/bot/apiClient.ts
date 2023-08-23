const ApiClient = {
  makeApiRequest: async (url: string, method: string, data?: object) => {
    const headers = {
      Authorization: `Bearer ${process.env.SYSTEM_TOKEN}`,
      "Content-Type": "application/json",
    }

    const options = {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
    }

    const response = await fetch(url, options)
    const responseData = await response.json()
    return responseData
  },
}
export default ApiClient

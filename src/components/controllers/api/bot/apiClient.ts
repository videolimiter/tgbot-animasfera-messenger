const ApiClient = {
  makeApiRequest: async (url: string, method: string, data?: object) => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.SYSTEM_TOKEN,
    }

    const options: RequestInit = {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
      credentials: "include",
      keepalive: true,
      mode: "cors",
    }

    const response = await fetch(url, options)
    return response
  },
}
export default ApiClient

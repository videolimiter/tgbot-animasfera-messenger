const getTagValue = (text: string, tagName: string): string | null => {
  const regex = new RegExp(`#${tagName}_([0-9]+)`)
  const match = JSON.stringify(text).match(regex)

  if (match) {
    return match[1]
  }

  return null
}
export default getTagValue

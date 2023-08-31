const findTags = (text: string): string[] | null => {
  const firstString = text.split("\n")[0]
  const regex = /#(\w+)/g
  const matches = []
  let match

  while ((match = regex.exec(firstString))) {
    matches.push(match[1])
  }
  if (matches) {
    return matches
  }
  return null
}
export default findTags

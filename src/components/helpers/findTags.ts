const findTags = (text: string): string[] => {
  const firstString = text.split("\n")
  const regex = /#(\w+)_/g
  const matches = firstString[0].match(regex)
  if (matches) {
    return matches.map((match) => match.slice(1, -1))
  }
  return []
}
export default findTags
  
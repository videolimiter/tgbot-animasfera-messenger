const findTags = (text: string): string[] => {
  const regex = /#(\w+)_/g
  const matches = text.match(regex)
  if (matches) {
    return matches.map((match) => match.slice(1, -1))
  }
  return []
}
export default findTags

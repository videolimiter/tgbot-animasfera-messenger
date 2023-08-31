const getTagTypeValue = (tag: string): string[] | null => {
  const res = tag.split("_")

  if (res.length > 1 && res.length < 3) {
    return res
  }

  return null
}
export default getTagTypeValue

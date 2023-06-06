export const parseSafe = (string) => {
  try {
    const result = JSON.parse(string)

    return result
  } catch (e) {
    return undefined
  }
}

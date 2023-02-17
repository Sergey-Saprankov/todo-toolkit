
export const titleHandler = (title: string) => {
    const max = 16
    const name = title.split('@')[0]
  
    return name.length <= max
      ? name
      : name
          .split('')
          .map((el, i) => (i <= max ? el : null))
          .filter(el => el)
          .join('') + '...'
  }
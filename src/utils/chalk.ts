class Chalk {
  private value: string
  private start: (...args: number[]) => string

  constructor() {
    this.value = ''
    this.start = (...numbers: number[]) => `\u001B[${numbers.join(';')}m`
  }

  bold() {
    this.value += this.start(1)
    return this
  }

  background(r: number, g: number, b: number) {
    this.value += this.start(48, 2, r, g, b)
    return this
  }

  color(hex: string): this
  color(r: number, g: number, b: number): this
  color(r: number | string, g?: number, b?: number) {
    if (typeof r === 'string') {
      const sharpHex = r
      const isHex = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(sharpHex)
      if (!isHex) {
        throw new Error(
          this
            .color('#F00')
            .text(sharpHex + ' is not a hex')
        )
      }

      const hex = sharpHex.slice(1)
      const rgb = []
      for (let index = 0; index < hex.length; index++) {
        if (hex.length === 3) {
          // #000
          rgb.push([hex[index], hex[index]])
        } else {
          // #000000
          rgb.push([hex[index], hex[index++]])
        }
      }

      [r, g, b] = rgb.map(item => parseInt(item.join(''), 16))
    }

    this.value += this.start(38, 2, ...[r, g, b].map(Number))

    return this
  }

  underline() {
    this.value += this.start(4)
    return this
  }

  test(...args: number[]) {
    this.value += this.start(...args)
    return this
  }

  text(text = '') {
    const value = this.value + text + '\u001B[0m'
    this.value = ''
    return value
  }
}

let chalk: Chalk
function create() {
  return chalk = chalk || new Chalk()
}

export = create()

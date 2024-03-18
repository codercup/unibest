if (Array.prototype.at === undefined) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.at = function at(index: number): any {
    if (index < 0) {
      // eslint-disable-next-line no-param-reassign
      index = this.length + index
    }
    return this[index]
  }
}

// 发现配置了 trailingcomma: "all" 也不会有函数的尾逗号，
// 与prettier官网描述的不一致。 @see https://prettier.io/docs/en/options#trailing-commas
export function fn(a: number, b: number) {
  console.log(a, b)
}
fn(12, 2)

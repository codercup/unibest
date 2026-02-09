export async function preApply(ctx) {
  console.log(`[login] Pre-apply for ${ctx.projectPath}`)
}

export async function postApply(ctx) {
  console.log(`[login] Post-apply for ${ctx.projectPath}`)
}

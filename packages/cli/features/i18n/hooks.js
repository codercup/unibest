export async function preApply(ctx) {
  console.log(`[i18n] Pre-apply for ${ctx.projectPath}`)
}

export async function postApply(ctx) {
  console.log(`[i18n] Post-apply for ${ctx.projectPath}`)
}

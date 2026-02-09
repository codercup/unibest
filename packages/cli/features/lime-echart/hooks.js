export async function preApply(ctx) {
  console.log(`[lime-echart] Pre-apply for ${ctx.projectPath}`)
}

export async function postApply(ctx) {
  console.log(`[lime-echart] Post-apply for ${ctx.projectPath}`)
}

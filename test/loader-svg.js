export async function resolve(specifier, context, next) {
  const nextResult = await next(specifier, context);

  if (!specifier.endsWith('.svg')) return nextResult;

  return {
    format: 'svg',
    shortCircuit: true,
    url: nextResult.url,
  };
}

export async function load(url, context, next) {
  if (context.format !== 'svg') return next(url, context);

  return {
    format: 'module',
    shortCircuit: true,
    source: `export default "${url}"`,
  };
}

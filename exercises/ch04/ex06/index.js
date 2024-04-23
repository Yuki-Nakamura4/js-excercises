export function resize1(params) {
  const maxWidth = (params && params.maxWidth) || 600;
  const maxHeight = (params && params.maxHeight) || 480;

  console.log({ maxWidth, maxHeight });
}

export function resize2(params) {
  const maxWidth = params?.maxWidth ?? 600;
  const maxHeight = params?.maxHeight ?? 480;

  console.log({ maxWidth, maxHeight });
}

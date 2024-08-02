export async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function slugify(str: string) {
  return str.trim().toLowerCase().replace(/ /g, '-');
}

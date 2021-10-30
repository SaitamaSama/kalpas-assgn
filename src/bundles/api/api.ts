export function get<T>(path: string, options?: RequestInit): Promise<T> {
  return fetch(`${process.env.API_BASE}${path}`, options).then((res) =>
    res.json(),
  );
}

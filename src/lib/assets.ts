/**
 * Возвращает путь к ассету с учётом basePath.
 * При переключении на хостинг без basePath - просто измените NEXT_PUBLIC_BASE_PATH в .env
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  // Убираем двойные слеши если path уже начинается с /
  if (path.startsWith("/")) {
    return `${basePath}${path}`;
  }
  return `${basePath}/${path}`;
}

/**
 * Для использования в CSS (background-image и т.д.)
 */
export function getAssetUrl(path: string): string {
  return `url(${getAssetPath(path)})`;
}

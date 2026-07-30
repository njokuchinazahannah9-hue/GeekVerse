export function getCoverUrl(manga, relationships) {
  const cover = relationships.find(
    (r) => r.type === "cover_art"
  );

  if (!cover) return "";

  return `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}.512.jpg`;
}
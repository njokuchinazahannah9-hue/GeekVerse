function ComicInfo({ title, value }) {
  if (!value) return null;

  return (
    <div className="comic-info">
      <span>{title}</span>
      <p>{value}</p>
    </div>
  );
}

export default ComicInfo;
const NewsCard = ({ news }) => {
  const { title, description, texte, medias, rubriques } = news;

  // Fonction pour tronquer une chaine de carac.
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="card w-full lg:w-80 bg-base-100 shadow-xl">
      <div className="card-body">
        <span
          className="badge badge-secondary mb-2"
          style={{ backgroundColor: rubriques[0]?.colorCode }}
        >
          {rubriques[0]?.name}
        </span>

        <h2 className="card-title text-lg font-bold">
          {truncateText(title, 40)}
        </h2>

        <p className="text-gray-600">{truncateText(description, 100)}</p>

        {/* Afficher un extrait du texte HTML */}
        <div
          className="prose mt-4"
          dangerouslySetInnerHTML={{
            __html: truncateText(texte.replace(/<[^>]*>?/gm, ""), 150), // Suppression des balises HTML
          }}
        ></div>
      </div>
    </div>
  );
};

export default NewsCard;

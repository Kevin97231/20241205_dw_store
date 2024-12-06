import PropTypes from "prop-types";

export const ButtonAccessible = ({
  handleClick,
  children,
  styleType = "primary",
  arialabel,
}) => {
  // Mapping des styles DaisyUI pour différents types de boutons
  const buttonStyles = {
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    accent: "btn btn-accent",
    success: "btn btn-success",
    warning: "btn btn-warning",
    error: "btn btn-error",
  };

  // Pourquoi le boutton est accessible ?
  //  L'élément <button> est sémantiquement conçu pour être interactif.
  // Les lecteurs d'écran reconnaissent automatiquement qu'il s'agit d'un bouton sans nécessiter de rôle explicite.
  // Il est également focusable et accessible via la navigation clavier par défaut.
  // L'élément <button> est accessible avec la touche Tab

  return (
    <button
      onClick={handleClick}
      className={buttonStyles[styleType] || buttonStyles.primary}
      aria-label={arialabel}
    >
      {children}
    </button>
  );
};

// PropTyps encore plus importante dans le cas d'élément générique
ButtonAccessible.propTypes = {
  handleClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  styleType: PropTypes.oneOf([
    "primary",
    "secondary",
    "accent",
    "success",
    "warning",
    "error",
  ]),
  arialabel: PropTypes.string.isRequired,
};

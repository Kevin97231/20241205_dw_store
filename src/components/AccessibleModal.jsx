import { useEffect, useRef } from "react";

// Pourquoi useRef() ?

// L'utilisation de useRef dans React est cruciale pour plusieurs raisons, particulièrement dans des
//  situations comme la gestion du focus, l'interaction avec le DOM ou la gestion d'éléments immutables.

// Les valeurs stockées dans useRef sont persistantes, ce qui signifie qu'elles conservent
// leur valeur même après un re-rendu du composant. Cela est essentiel lorsqu'il s'agit de suivre
// des éléments ou des états entre les mises à jour sans réinitialiser la valeur.

export const AccessibleModal = ({ isOpen, onClose, title, children }) => {
  // Références pour la modale et les éléments focusables (premier et dernier)
  const modalRef = useRef(null);
  const firstFocusableElementRef = useRef(null);
  const lastFocusableElementRef = useRef(null);

  // Fonction pour gérer la fermeture avec la touche Escape
  const handleEscKey = (event) => {
    if (event.key === "Escape") {
      onClose(); // Si la touche "Escape" est pressée, fermer la modale
    }
  };

  // Gérer le focus lors de l'ouverture et de la fermeture de la modale
  useEffect(() => {
    if (isOpen) {
      // Lorsque la modale s'ouvre, déplacer le focus sur le premier élément focusable
      firstFocusableElementRef.current?.focus();

      // Ajouter un écouteur d'événements pour surveiller la touche "Escape"
      document.addEventListener("keydown", handleEscKey);

      // Désactiver le scroll de fond lorsque la modale est ouverte
      document.body.style.overflow = "hidden";
    } else {
      // Lorsque la modale est fermée, restaurer le scroll de fond
      document.body.style.overflow = "auto";
      // Supprimer l'écouteur d'événements pour la touche "Escape"
      document.removeEventListener("keydown", handleEscKey);
    }

    // Retourner une fonction de nettoyage pour supprimer l'écouteur d'événements lors du démontage du composant
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]); // Cette logique se déclenche uniquement lorsque `isOpen` change

  // Fonction pour gérer la navigation dans la modale avec les touches Tab et Shift+Tab
  const handleTrapFocus = (event) => {
    if (event.key === "Tab") {
      // Si la touche Tab est pressée, contrôler la navigation du focus à l'intérieur de la modale
      if (event.shiftKey) {
        // Si la touche Shift est maintenue, on veut aller à l'élément précédent (vers le dernier élément focusable)
        if (document.activeElement === firstFocusableElementRef.current) {
          lastFocusableElementRef.current?.focus(); // Aller au dernier élément
          event.preventDefault(); // Empêcher l'action par défaut de Tab
        }
      } else {
        // Si la touche Tab est pressée sans Shift, on va au premier élément
        if (document.activeElement === lastFocusableElementRef.current) {
          firstFocusableElementRef.current?.focus(); // Aller au premier élément
          event.preventDefault(); // Empêcher l'action par défaut de Tab
        }
      }
    }
  };

  return (
    <>
      {isOpen && (
        // Si la modale est ouverte, afficher la fenêtre modale
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          role="dialog" // Attribuer le rôle "dialog" pour indiquer qu'il s'agit d'une fenêtre modale
          aria-labelledby="modal-title" // Lier le titre de la modale à son en-tête via aria-labelledby
          tabIndex="-1" // Rendre la modale focusable, mais elle ne peut pas être sélectionnée comme élément de la page
          ref={modalRef}
          onKeyDown={handleTrapFocus} // Gérer les événements de navigation au clavier pour le focus
        >
          <div className="bg-white p-6 rounded-lg w-1/3">
            {/* Titre de la modale, lié au `aria-labelledby` */}
            <h2
              id="modal-title"
              className="text-xl font-bold mb-4"
              ref={firstFocusableElementRef} // La première cible de focus lors de l'ouverture
            >
              {title}
            </h2>

            <div>{children}</div>

            {/* Bouton pour fermer la modale, lié à `lastFocusableElementRef` pour gérer le focus */}
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              ref={lastFocusableElementRef} // La dernière cible de focus
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibleModal;

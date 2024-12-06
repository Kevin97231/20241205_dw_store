import { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonAccessible } from "../components/ButtonAccessible";
import AccessibleModal from "../components/AccessibleModal";

export const TpAccessibility = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [todos, setTodos] = useState([]);

  const addTodo = (data) => {
    setTodos([...todos, data]);
    reset();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6">Ma To-Do List</h1>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit(addTodo)}
        aria-labelledby="todo-form"
        className="mb-6"
      >
        {/* Utilisation de <fieldset> pour regrouper des champs liés dans un formulaire */}

        <fieldset className="border border-base-300 p-4 rounded">
          {/* Utilisation de <legend> pour donner un titre au groupe de champs */}
          {/* Permet aux lecteurs d'écran d'identifier le contexte de ce groupe */}
          {/* Champ Titre */}
          <legend id="todo-form" className="text-lg font-semibold">
            Ajouter une nouvelle tâche
          </legend>

          <div className="mb-4">
            {/* Utilisation de <label> associé à l'attribut htmlFor pour identifier l'input */}
            {/* L'association explicite améliore la navigation clavier et l'expérience des lecteurs d'écran */}
            <label
              htmlFor="title"
              className="block text-sm font-medium text-base-content mb-1"
            >
              Titre :
            </label>
            {/* Attribut 'aria-describedby' pour fournir une description supplémentaire en cas d'erreur */}
            {/* Améliore la compréhension des messages d'erreur pour les lecteurs d'écran */}
            <input
              id="title"
              type="text"
              {...register("title", {
                required: "Le titre est obligatoire.",
              })}
              aria-describedby={errors.title ? "title-error" : undefined}
              className={`block w-full px-3 py-2 border ${
                errors.title ? "border-error" : "border-base-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
            />
            {/* Utilisation de 'role="alert"' pour indiquer qu'il s'agit d'un message important */}
            {/* Signale immédiatement l'erreur à l'utilisateur utilisant un lecteur d'écran */}
            {errors.title && (
              <span
                id="title-error"
                role="alert"
                className="text-error text-sm"
              >
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Champ Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-base-content mb-1"
            >
              Description :
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Champ Date d'échéance */}
          <div className="mb-4">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-base-content mb-1"
            >
              Date d'échéance :
            </label>
            <input
              id="dueDate"
              type="date"
              {...register("dueDate", {
                required: "La date d'échéance est obligatoire.",
                validate: (value) => {
                  const currentDate = new Date();
                  const selectedDate = new Date(value);
                  return (
                    selectedDate >= currentDate ||
                    "La date doit être dans le futur."
                  );
                },
              })}
              aria-describedby={errors.dueDate ? "dueDate-error" : undefined}
              className={`block w-full px-3 py-2 border ${
                errors.dueDate ? "border-error" : "border-base-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
            />
            {errors.dueDate && (
              <span
                id="dueDate-error"
                role="alert"
                className="text-error text-sm"
              >
                {errors.dueDate.message}
              </span>
            )}
          </div>

          {/* <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-content rounded-md shadow hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Ajouter une nouvelle tâche"
          >
            Ajouter
          </button> */}

          <ButtonAccessible arialabel={"Ajouter une nouvelle tâche"}>
            Ajouter
          </ButtonAccessible>
        </fieldset>
      </form>

      <ButtonAccessible handleClick={openModal} arialabel={"ouvrir le modal"}>
        Ouvrir le modal
      </ButtonAccessible>

      {/* Liste des tâches */}
      <ul className="space-y-4">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="border border-base-300 rounded-md p-4 shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-2">{todo.title}</h2>
            <p className="text-sm text-base-content mb-2">
              <strong>Description :</strong>{" "}
              {todo.description || "Pas de description"}
            </p>
            <p className="text-sm text-base-content">
              <strong>Date d'échéance :</strong> {todo.dueDate}
            </p>
          </li>
        ))}
      </ul>

      <AccessibleModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Mon Modal accessible"
      >
        <p>
          Voici le contenu de la modale. Vous pouvez appuyer sur ESC pour la
          fermer.
        </p>
      </AccessibleModal>
    </div>
  );
};

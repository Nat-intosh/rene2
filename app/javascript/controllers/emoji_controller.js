import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["selectedEmojis", "emoji1Id", "emoji2Id", "emoji3Id", "submitButton"];

  connect() {
    this.selected = [];  // Initialise une liste vide pour stocker les IDs sélectionnés
    console.log("Contrôleur connecté, liste initiale des émojis sélectionnés :", this.selected);
  }

  addEmoji(event) {
    // Étape 1 : Récupérer l'ID de l'émoji cliqué
    const emojiId = event.currentTarget.dataset.emoji_id;
    console.log("Émoji cliqué, ID récupéré :", emojiId);

    // Étape 2 : Cloner l'image de l'émoji cliqué
    const emojiImage = event.currentTarget.querySelector("img").cloneNode(true);
    console.log("Image de l'émoji clonée :", emojiImage);

    // Étape 3 : Vérifier si l'émoji a déjà été sélectionné
    if (this.selected.includes(emojiId)) {
      console.log("Cet émoji est déjà sélectionné.");
      alert("Cet émoji est déjà sélectionné !");
      return;  // Arrêter l'exécution si l'émoji est déjà dans la sélection
    }

    // Étape 4 : Vérifier si le nombre d'émojis sélectionnés atteint 3
    if (this.selected.length >= 3) {
      console.log("Nombre d'émojis sélectionnés dépasse 3.");
      alert("Vous ne pouvez sélectionner que 3 émojis.");
      return;  // Arrêter l'exécution si 3 émojis ont déjà été sélectionnés
    }

    // Étape 5 : Ajouter l'ID de l'émoji à la liste des sélectionnés
    this.selected.push(emojiId);
    console.log("Nouvelle liste des émojis sélectionnés :", this.selected);

    // Étape 6 : Mettre à jour l'affichage des émojis sélectionnés
    this.displaySelectedEmoji(emojiImage);

    // Étape 7 : Mettre à jour les champs cachés du formulaire avec les IDs des émojis sélectionnés
    this.updateHiddenFields();

    // Étape 8 : Activer ou désactiver le bouton de soumission selon le nombre d'émojis sélectionnés
    this.updateSubmitButtonState();
  }

  // Affiche l'image de l'émoji sélectionné dans la section "Votre sélection"
  displaySelectedEmoji(emojiImage) {
    const container = document.createElement("div");
    container.classList.add("selected-emoji");

    container.appendChild(emojiImage);
    this.selectedEmojisTarget.appendChild(container);
    console.log("Émoji ajouté à l'affichage :", emojiImage);
  }

  // Met à jour les champs cachés avec les IDs des émojis sélectionnés
  updateHiddenFields() {
    const hiddenFields = [this.emoji1IdTarget, this.emoji2IdTarget, this.emoji3IdTarget];
    hiddenFields.forEach((field, index) => {
      field.value = this.selected[index] || null;  // Si la sélection est vide, met à null
      console.log(`Champ caché ${index + 1} mis à jour avec l'ID :`, field.value);
    });
  }

  // Active ou désactive le bouton de soumission en fonction du nombre d'émojis sélectionnés
  updateSubmitButtonState() {
    this.submitButtonTarget.disabled = this.selected.length !== 3;  // Désactive si moins de 3 émojis
    console.log("Bouton de soumission", this.submitButtonTarget.disabled ? "désactivé" : "activé");
  }
}

import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["selectedEmojis", "emoji1Id", "emoji2Id", "emoji3Id", "submitButton"];

  connect() {
    this.selected = []; // Initialise une liste vide pour stocker les IDs sélectionnés
    console.log("Contrôleur connecté, liste initiale des émojis sélectionnés :", this.selected);
  }

  addEmoji(event) {
    // Identifier la source de l'émoji cliqué
    const emojiElement = event.target.closest(".emoji-card img"); // Trouve l'image à l'intérieur de .emoji-card
    console.log("Élément cliqué :", event.target);
    console.log("HTML de l'élément cliqué :", event.target.outerHTML);
 
    if (!emojiElement) {
      console.error("Image non trouvée dans l'élément cliqué. Vérifie la structure HTML.");
      return;
    }
  
    // Récupérer l'ID de l'émoji depuis l'attribut `data-emoji-id`
    const emojiId = emojiElement.dataset.emojiId;
  
    if (!emojiId) {
      console.error("ID de l'émoji introuvable. Vérifie le HTML.");
      return;
    }
  
    console.log("Émoji cliqué, ID récupéré :", emojiId);
  
    // Vérifier si l'émoji est déjà sélectionné
    if (this.selected.includes(emojiId)) {
      alert("Cet émoji est déjà sélectionné !");
      return;
    }
  
    // Limiter à 3 sélections maximum
    if (this.selected.length >= 3) {
      alert("Vous ne pouvez sélectionner que 3 émojis.");
      return;
    }
  
    // Ajouter l'émoji à la liste sélectionnée
    this.selected.push(emojiId);
  
    // Cloner l'image de l'émoji pour affichage dans la sélection
    const emojiImageClone = emojiElement.cloneNode(true);
    this.displaySelectedEmoji(emojiImageClone);
  
    // Mettre à jour les champs cachés et l'état du bouton
    this.updateHiddenFields();
    this.updateSubmitButtonState();
  }
  
  
  
  displaySelectedEmoji(emojiImage) {
    const container = document.createElement("div");
    container.classList.add("selected-emoji");
    container.appendChild(emojiImage);
    this.selectedEmojisTarget.appendChild(container);
  }

  updateHiddenFields() {
    const hiddenFields = [this.emoji1IdTarget, this.emoji2IdTarget, this.emoji3IdTarget];
    hiddenFields.forEach((field, index) => {
      field.value = this.selected[index] || null; // Associe les IDs sélectionnés ou met à null
    });
  }

  updateSubmitButtonState() {
    this.submitButtonTarget.disabled = this.selected.length !== 3; // Active si 3 émojis sont sélectionnés
  }
}

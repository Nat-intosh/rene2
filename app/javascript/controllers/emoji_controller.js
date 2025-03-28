import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["selectedEmojis", "emoji1Id", "emoji2Id", "emoji3Id", "submitButton"];

  connect() {
    this.selected = [];
    console.log("Contrôleur connecté, liste initiale des émojis sélectionnés :", this.selected);
    this.updateSubmitButtonState();
  }

  // addEmoji(event) {
  //   // Identifier la source de l'émoji cliqué
  //   const emojiElement = event.target.closest(".emoji-card img"); // Trouve l'image à l'intérieur de .emoji-card
  //   console.log("Élément cliqué :", event.target);
  //   console.log("HTML de l'élément cliqué :", event.target.outerHTML);

  //   if (!emojiElement) {
  //     console.error("Image non trouvée dans l'élément cliqué. Vérifie la structure HTML.");
  //     return;
  //   }

  //   // Récupérer l'ID de l'émoji depuis l'attribut `data-emoji-id`
  //   const emojiId = emojiElement.dataset.emojiId;

  //   if (!emojiId) {
  //     console.error("ID de l'émoji introuvable. Vérifie le HTML.");
  //     return;
  //   }

  //   console.log("Émoji cliqué, ID récupéré :", emojiId);

  //   // Vérifier si l'émoji est déjà sélectionné
  //   if (this.selected.includes(emojiId)) {
  //     alert("Cet émoji est déjà sélectionné !");
  //     return;
  //   }

  //   // Limiter à 3 sélections maximum
  //   if (this.selected.length >= 3) {
  //     alert("Vous ne pouvez sélectionner que 3 émojis.");
  //     return;
  //   }

  //   // Ajouter l'émoji à la liste sélectionnée
  //   this.selected.push(emojiId);

  //   // Cloner l'image de l'émoji pour affichage dans la sélection
  //   const emojiImageClone = emojiElement.cloneNode(true);
  //   this.displaySelectedEmoji(emojiImageClone);

  //   // Mettre à jour les champs cachés et l'état du bouton
  //   this.updateHiddenFields();
  //   this.updateSubmitButtonState();
  // }

  addEmoji(event) {
    const emojiCard = event.target.closest(".emoji-card");
    if (!emojiCard) {
      console.error("Élément .emoji-card non trouvé. Vérifiez la structure HTML.");
      return;
    }

    const emojiId = emojiCard.dataset.emojiId;
    const emojiText = emojiCard.textContent.trim();

    if (!emojiId) {
      console.error("ID de l'émoji introuvable. Vérifiez le HTML.");
      return;
    }

    if (this.selected.includes(emojiId)) {
      alert("Cet émoji est déjà sélectionné !");
      return;
    }

    if (this.selected.length >= 3) {
      alert("Vous ne pouvez sélectionner que 3 émojis.");
      return;
    }

    this.selected.push(emojiId);

    emojiCard.classList.add("disabled");

    const selectedEmoji = document.createElement("span");
    selectedEmoji.textContent = emojiText;
    selectedEmoji.classList.add("selected-emoji");
    selectedEmoji.dataset.emojiId = emojiId;

    selectedEmoji.addEventListener("click", () => this.removeEmoji(emojiId, selectedEmoji, emojiCard));

    this.selectedEmojisTarget.appendChild(selectedEmoji);

    this.updateHiddenFields();
    this.updateSubmitButtonState();
  }

  resetEmojis() {
    this.selected = [];

    this.selectedEmojisTarget.innerHTML = "";

    this.emoji1IdTarget.value = null;
    this.emoji2IdTarget.value = null;
    this.emoji3IdTarget.value = null;

    const emojiCards = document.querySelectorAll(".emoji-card.disabled");
    emojiCards.forEach(card => {
      card.classList.remove("disabled");
    });

    this.updateSubmitButtonState();
  }

  removeEmoji(emojiId, selectedEmoji, emojiCard) {
    this.selected = this.selected.filter(id => id !== emojiId);

    selectedEmoji.remove();

    if (emojiCard) {
      emojiCard.classList.remove("disabled");
    }

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
      field.value = this.selected[index] || null;
    });
  }

  updateSubmitButtonState() {
    const isDisabled = this.selected.length !== 3;
    this.submitButtonTarget.disabled = isDisabled;

    if (isDisabled) {
      this.submitButtonTarget.classList.add('disable');
    } else {
      this.submitButtonTarget.classList.remove('disable');
    }
  }
}

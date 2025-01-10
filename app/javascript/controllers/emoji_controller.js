import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["emoji1", "emoji2", "emoji3", "submitButton"];

  connect() {
    this.selectedEmojis = [];
    this.updateUI();
    console.log("Emoji controller connected zizi");
  }

  addEmoji(event) {
    const emojiId = event.currentTarget.dataset.emojiId;

    // Add emoji to selected emojis if not already selected
    if (this.selectedEmojis.length < 3 && !this.selectedEmojis.includes(emojiId)) {
      this.selectedEmojis.push(emojiId);
      this.updateUI();
    }
  }

  updateUI() {
    const selectedEmojisContainer = document.getElementById("selected-emojis");
    selectedEmojisContainer.innerHTML = "";  // Clear selected emojis display

    // Render the selected emojis in the UI
    this.selectedEmojis.forEach((emojiId, index) => {
      const emojiElement = document.querySelector(`[data-emoji-id="${emojiId}"] img`);
      
      if (emojiElement) {
        const emojiImage = emojiElement.cloneNode(true);
        selectedEmojisContainer.appendChild(emojiImage);

        // Set the hidden field values for each selected emoji
        document.getElementById(`emoji${index + 1}_id`).value = emojiId;
      } else {
        console.warn(`Emoji with ID ${emojiId} not found in the DOM`);
      }
    });

    // Enable/disable the submit button based on the number of selected emojis
    document.getElementById("submit-button").disabled = this.selectedEmojis.length !== 3;
  }
}

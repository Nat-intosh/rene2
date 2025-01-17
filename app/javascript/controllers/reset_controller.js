import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    this.element.addEventListener('click', this.resetContributions.bind(this));
    console.log("reset controller connected");
  }

  disconnect() {
      this.element.removeEventListener('click', this.resetContributions.bind(this))
  }

  resetContributions(event) {
    event.preventDefault();

    fetch('/questions/reset_contributions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {throw new Error(error.message)})
        }
        return response.json()
    })
    .then(data => {
      if (data.status === 'success') {
        console.log ("success")
        window.location.href = "/";
      }
    })
    .catch(error => {
      console.error("Error resetting contributions:", error);
      alert("An error occurred while resetting: " + error.message);
    });
  }
}

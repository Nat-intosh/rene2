import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["section"];


  connect() {
    // Check if local storage indicates a reset is needed
    if (localStorage.getItem('resetFlow')) {
      localStorage.removeItem('resetFlow'); // Clear the flag
      // DO NOT RELOAD HERE
    } 
    this.showSection(0); // Always show the first section
  }

  next() {
    const currentStep = this.getCurrentStep();
    if (currentStep < this.sectionTargets.length - 1) {
      this.showSection(currentStep + 1);
    }
  }

  submitForm(event) {
    event.preventDefault();
    const form = event.target;

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        this.next(); // Go to the "Thanks" screen (if not the last contribution)
      } else if (data.status === 'finished') {
          window.location.href = "/home/finish"; // Redirect directly to finish
      } else {
        // Handle errors
        alert("An error occurred during submission.");
        console.error("Server returned an error:", data);
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
      alert("A network error occurred.");
    });
  }

  reset() {
    localStorage.setItem('resetFlow', 'true'); // Set a flag in local storage
    window.location.href = "/questions/contribute"; // Redirect to the contribute page
  }
  showSection(index) {
    this.sectionTargets.forEach((section, i) => {
      section.hidden = i !== index;
    });
  }

  getCurrentStep() {
    let currentStep = 0;
    this.sectionTargets.forEach((section, index) => {
      if (!section.hidden) {
        currentStep = index;
      }
    });
    return currentStep;
  }
}
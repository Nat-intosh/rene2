import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["section"];


  connect() {
    if (localStorage.getItem('resetFlow')) {
      localStorage.removeItem('resetFlow');
    }
    this.showSection(0);
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
        this.next();
      } else if (data.status === 'finished') {
          window.location.href = "/home/finish";
      } else {

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
    localStorage.setItem('resetFlow', 'true');
    window.location.href = "/questions/contribute";
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

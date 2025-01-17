import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["radio", "submitButton"];

  connect() {
    console.log("Questions controller connected");

    if (!localStorage.getItem("answeredQuestionsCount")) {
      localStorage.setItem("answeredQuestionsCount", "0");
    }

    const resultPage = document.querySelector(".result-page");
    if (resultPage) {
      this.handleResultPage();
    }
  }

  toggleSubmit() {
    const isSelected = this.radioTargets.some(radio => radio.checked);
    if (isSelected) {
      this.submitButtonTarget.disabled = false;
      this.submitButtonTarget.classList.remove("disable");
    } else {
      this.submitButtonTarget.disabled = true;
      this.submitButtonTarget.classList.add("disable");
    }
  }

  submitQuestion(event) {
    console.log("Question submitted");

    let count = parseInt(localStorage.getItem("answeredQuestionsCount")) || 0;
    count++;
    localStorage.setItem("answeredQuestionsCount", count);

    const form = event.target.closest("form");
    form.submit();
  }

  handleResultPage() {
    console.log("On the result page");

    let count = parseInt(localStorage.getItem("answeredQuestionsCount")) || 0;
    console.log(`Answered Questions Count: ${count}`);

    const continueButton = document.querySelector(".button-continue");

    if (count >= 3) {
      console.log("Updating button for contribution");

      continueButton.textContent = "Contribuer";
      continueButton.href = "/questions/contribute";

      localStorage.setItem("answeredQuestionsCount", "0");
    } else {
      console.log("Button remains for next question");
    }
  }
}

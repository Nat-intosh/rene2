import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log("Questions controller connected");

    // Initialize localStorage if not already set
    if (!localStorage.getItem("answeredQuestionsCount")) {
      localStorage.setItem("answeredQuestionsCount", "0");
    }

    // Check if we are on the result page
    const resultPage = document.querySelector(".result-page");
    if (resultPage) {
      this.handleResultPage();
    }
  }

  submitQuestion(event) {
    console.log("Question submitted");

    // Increment answered questions count
    let count = parseInt(localStorage.getItem("answeredQuestionsCount")) || 0;
    count++;
    localStorage.setItem("answeredQuestionsCount", count);

    // Submit the form to show the result page
    const form = event.target.closest("form");
    form.submit();
  }

  handleResultPage() {
    console.log("On the result page");

    // Get the current count of answered questions
    let count = parseInt(localStorage.getItem("answeredQuestionsCount")) || 0;
    console.log(`Answered Questions Count: ${count}`);

    const continueButton = document.querySelector(".button-continue");

    if (count >= 3) {
      console.log("Updating button for contribution");

      // Update button text and link for contribution
      continueButton.textContent = "Contribuer";
      continueButton.href = "/questions/contribute";

      // Reset count to 0 after updating the button
      localStorage.setItem("answeredQuestionsCount", "0");
    } else {
      console.log("Button remains for next question");
    }
  }
}

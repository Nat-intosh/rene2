import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("fancybox connecté");
    this.initFancybox();
  }

  initFancybox() {
    if (typeof $.fancybox === 'function') {
      $("[data-fancybox]").fancybox({
        loop: true,
        buttons: [
          "close"
        ],
      });
    } else {
      console.error("FancyBox n'est pas chargé correctement");
    }
}

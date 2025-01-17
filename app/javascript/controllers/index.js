// // Import and register all your controllers from the importmap via controllers/**/*_controller
// import { application } from "controllers/application"
// import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
// eagerLoadControllersFrom("controllers", application)
// import EmojiController from "./emoji_controller";

// const application = Application.start();
// application.register("emoji", EmojiController);
// app/javascript/controllers/index.js

import { Application } from "@hotwired/stimulus";
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading";

const application = Application.start();

eagerLoadControllersFrom("controllers", application);

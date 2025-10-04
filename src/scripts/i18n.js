import i18next from "i18next";
import resources from "./locale.js";

export const i18nInstance = i18next.createInstance(
  {
    lng: "ru",
    debug: false,
    resources,
  },
  (err, t) => {
    if (err) return console.log("something went wrong loading", err);
    t();
  }
);

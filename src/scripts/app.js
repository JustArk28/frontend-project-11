import onChange from "on-change";
// import { validateUrl } from "./watchers";
import * as yup from "yup";
import i18next from "i18next";
import resources from "./locale.js";
import { rssData } from "./rss.js";
import { renderMainPartOfAgregator } from "./render";
// import axios from 'axios';

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

export const state = {
  website: "",
  links: [],
  feeds: [],
  posts: [],
  //posts: [{id, feedId, title, link}]
};

const app = () => {
  renderMainPartOfAgregator();

  const form = document.querySelector("form");
  const input = document.getElementById("url-input");
  const feedback = document.querySelector(".feedback");
  // const setupYup = () => {
  yup.setLocale({
    mixed: {
      required: i18nInstance.t("feedback.emptyField"),
      notOneOf: i18nInstance.t("feedback.rssAlreadyAdded"),
    },
    string: {
      url: i18nInstance.t("feedback.invalidUrl"),
    },
  });
  // }
  // setupYup()

  const schema = yup.string().required().url().notOneOf(state.links);

  const validUrl = () => {
    // feedback.textContent = i18nInstance.t('feedback.success')
    // feedback.classList.remove('text-danger')
    // feedback.classList.add('text-success')
    // input.classList.remove('is-invalid')
    // state.links.push(state.website)
    // state.links.filter((link) => {
    //   if (input.value !== link) {
    //     state.links.push(input.value)
    //     console.log('link', link)
    //     // return
    //     // watchedObject.links.push(input.value)
    //     // watchedObject.links.pop()
    //   }
    //   // return
    // })
    console.log("22", state);
    // state.links.forEach((link) => {
    rssData();

    // })
    form.reset();
    input.focus();
  };
  const invalidUrl = (text) => {
    feedback.textContent = text;
    feedback.classList.remove("text-success");
    feedback.classList.add("text-danger");
    input.classList.add("is-invalid");
  };
  const validateUrl = (url) => {
    // console.log(schema.validate(url))
    return schema
      .validate(url)
      .then(() => validUrl())
      .catch((error) => {
        invalidUrl(error.message);
        console.log(error);
      });
  };

  // const watchObject = onChange(state, () => {
  //   validateUrl(watchObject.website);
  //   console.log("state", state);
  // });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    state.website = input.value.trim();
    validateUrl(state.website);
    // console.log(watchedObject)
  });

  // const url = 'http://lorem-rss.herokuapp.com/feed';
  // const url = 'https://eadaily.com/ru/rss/index.xml'
};
export default app;

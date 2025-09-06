import axios from 'axios';
import { elements, renderFeeds, renderPosts } from './render';
import { state } from './app';

const domParser = (content) => {
  const parser = new DOMParser();
  return parser.parseFromString(content, 'text/xml');
}

export const rssData = (watchedObject) => {
  // Формируем URL для прокси
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(watchedObject.website)}`;

  axios.get(proxyUrl)
    .then((response) => {
      const newDom = domParser(response.data.contents)
      const feedTitle = newDom.querySelector('title')?.textContent
      const feedDescription = newDom.querySelector('description')?.textContent
      state.feeds.push({ title: feedTitle, description: feedDescription })
 
      const rssPostItems = newDom.querySelectorAll('item')
      let newPosts = []
      rssPostItems.forEach((newPost) => {
        const title = newPost.querySelector('title')?.textContent
        const link = newPost.querySelector('link')?.textContent
        const subtitle = newPost.querySelector('description')?.textContent
        newPosts.push({ title, link, subtitle })
      })
      state.posts = [...newPosts, ...state.posts]
    //   console.log(state.posts)
      renderPosts(elements, state)
      renderFeeds(elements, state)
      console.log(newDom);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
}

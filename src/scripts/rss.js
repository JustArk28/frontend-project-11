import axios from 'axios';
import { elements, renderFeeds, renderPosts } from './render';
import { state } from './app';

const domParser = (content) => {
  const parser = new DOMParser();
  return parser.parseFromString(content, 'text/xml');
}

let num = 0
const createPosts = (newDom) => {
  const rssPostItems = newDom.querySelectorAll('item')
  let newPosts = []
  rssPostItems.forEach((newPost) => {
    const title = newPost.querySelector('title')?.textContent
    const link = newPost.querySelector('link')?.textContent
    const subtitle = newPost.querySelector('description')?.textContent
    const id = newPost.querySelector('pubDate')?.textContent + num++
    newPosts.push({ id, title, link, subtitle })
  })
  return newPosts
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
      state.posts = [...createPosts(newDom), ...state.posts]
      renderPosts(elements, state)
      renderFeeds(elements, state)
      console.log(newDom);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    
  const getNewDom = () => {
  axios.get(proxyUrl)
    .then((response) => {
      const newDom = domParser(response.data.contents)
      const newPostItems = newDom.querySelectorAll('item')
      let arr = []
      newPostItems.forEach((post) => {
        const title = post.querySelector('title')?.textContent
        arr.push(title)
        
      })
      const newItems = new Set([...arr])

      let result = []
      state.posts.forEach((item) => {
        result.push(item.title)
      })
      const stateItems = new Set([...result])
     
      const newTitle = new Set([...newItems].filter((title) => !stateItems.has(title)));
      console.log(Array.from(newTitle))
      if (Array.from(newTitle).length > 0) {
        console.log('string', Array.from(newTitle).toString())
        const newPostItems1 = newDom.querySelectorAll('item')
        const newItems = []
        newPostItems1.forEach((item) => {
          if (item.textContent.includes(Array.from(newTitle).toString())) {
            const itemTitle = item.querySelector('title')?.textContent
            const itemLink = item.querySelector('link')?.textContent
            const itemSubtitle = item.querySelector('description')?.textContent
            const itemId = item.querySelector('pubDate')?.textContent + num++
            newItems.push({ id: itemId, title: itemTitle, link: itemLink, subtitle: itemSubtitle })
            state.posts = [...newItems, ...state.posts]
            renderPosts(elements, state)
          }
        })
       
      }
      console.log(state.posts)
      console.log(newDom);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    setTimeout(getNewDom, 5000);
  }
  setTimeout(getNewDom, 5000);
}

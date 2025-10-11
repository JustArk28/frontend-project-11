import * as yup from 'yup'
import { i18nInstance } from './i18n.js'
import { setupYup } from './setupYup.js'
import {
  renderMainPartOfAgregator,
  elements,
  renderFeeds,
  renderPosts,
  renderSuccessFeedback,
  renderErrorFeedback,
} from './render.js'
import axios from 'axios'

const app = () => {
  renderMainPartOfAgregator()
  setupYup(i18nInstance)

  const state = {
    website: '',
    feeds: [],
    posts: [],
  }

  const form = document.querySelector('form')
  const input = document.getElementById('url-input')
  const feedback = document.querySelector('.feedback')

  const domParse = (content) => {
    const parser = new DOMParser()
    const parsedContent = parser.parseFromString(content, 'text/xml')
    const parsererror = parsedContent.querySelector('parsererror')
    if (parsererror) {
      renderErrorFeedback()
      feedback.textContent = i18nInstance.t('feedback.noValidRss')
      return
    }
    return parsedContent
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
      newPosts.push({ id, title, link, subtitle, viewed: false })
    })
    return newPosts
  }

  const isFeedExists = (feedTitle, feedDescription) => {
    return state.feeds.some(feed =>
      feed.title === feedTitle && feed.description === feedDescription,
    )
  }

  // Функция для проверки существования поста
  const isPostExists = (postTitle, postLink) => {
    return state.posts.some(post =>
      post.title === postTitle && post.link === postLink,
    )
  }

  const rssData = () => {
    // Формируем URL для прокси
    const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(state.website)}`

    axios
      .get(proxyUrl)
      .then((response) => {
        const newDom = domParse(response.data.contents)
        const feedId = Date.now()
        const feedTitle = newDom.querySelector('title')?.textContent
        const feedDescription = newDom.querySelector('description')?.textContent
        if (!isFeedExists(feedTitle, feedDescription)) {
          state.feeds.push({ id: feedId, title: feedTitle, description: feedDescription })
          renderSuccessFeedback()
          feedback.textContent = i18nInstance.t('feedback.success')
          form.reset()
          input.focus()
          const getNewDom = () => {
            axios
              .get(proxyUrl)
              .then((response) => {
                const newDom = domParse(response.data.contents)
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

                const newTitle = new Set(
                  [...newItems].filter(title => !stateItems.has(title)),
                )
                if (Array.from(newTitle).length > 0) {
                  const newPostItems1 = newDom.querySelectorAll('item')
                  const newItems = []
                  newPostItems1.forEach((item) => {
                    if (
                      item.textContent.includes(Array.from(newTitle).toString())
                    ) {
                      const itemTitle = item.querySelector('title')?.textContent
                      const itemLink = item.querySelector('link')?.textContent
                      const itemSubtitle = item.querySelector('description')?.textContent
                      const itemId = item.querySelector('pubDate')?.textContent + num++
                      newItems.push({
                        id: itemId,
                        title: itemTitle,
                        link: itemLink,
                        subtitle: itemSubtitle,
                        viewed: false,
                      })
                      state.posts = [...newItems, ...state.posts]
                      renderPosts(elements, state)
                    }
                  })
                }
              })
              .catch((error) => {
                if (error.message === 'Network Error') {
                  feedback.textContent = i18nInstance.t('feedback.connectionError')
                  renderErrorFeedback()
                }
                console.log(error)
              })
            setTimeout(getNewDom, 5000)
          }
          setTimeout(getNewDom, 5000)
        }
        else {
          renderErrorFeedback()
          feedback.textContent = i18nInstance.t('feedback.rssAlreadyAdded')
        }
        // Добавляем только новые посты
        const newPosts = createPosts(newDom).filter(post =>
          !isPostExists(post.title, post.link),
        )
        state.posts = [...newPosts, ...state.posts]
        renderPosts(elements, state)
        renderFeeds(elements, state)
      })
      .catch((error) => {
        if (error.message === 'Network Error') {
          feedback.textContent = i18nInstance.t('feedback.connectionError')
          renderErrorFeedback()
        }
        console.log(error)
      })
  }

  const invalidUrl = (text) => {
    feedback.textContent = text
    renderErrorFeedback()
  }
  const validateUrl = (url) => {
    const schema = yup.string().required().url()
    return schema
      .validate(url)
      .then(() => rssData())
      .catch((error) => {
        invalidUrl(error.message)
      })
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    state.website = input.value.trim()
    validateUrl(state.website)
  })
}

export default app

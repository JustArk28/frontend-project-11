import { i18nInstance } from "./app"

export const renderMainPartOfAgregator = () => {
  const header = document.querySelector('h1')
  header.textContent = i18nInstance.t('header')
  const description = document.querySelector('.lead')
  description.textContent = i18nInstance.t('description')
  const label = document.querySelector('[for="url-input"]')
  label.textContent = i18nInstance.t('label')
  const button = document.querySelector('[type="submit"]')
  button.textContent = i18nInstance.t('button')
}


export const elements = {
    feedsBlock: document.querySelector('.feeds'),
    postsBlock: document.querySelector('.posts'),
  }

export const renderFeeds = (elements, state) => {
  elements.feedsBlock.innerHTML = ''
  const feedsMainDiv = document.createElement('div')
  feedsMainDiv.classList.add('card', 'border-0')
  const feedsBodyDiv = document.createElement('div')
  feedsBodyDiv.classList.add('card-body')
  const feedsTitle = document.createElement('h2')
  feedsTitle.classList.add('card-title', 'h4')
  feedsTitle.textContent = i18nInstance.t('rss.feeds')
  const feedsList = document.createElement('ul')
  feedsList.classList.add('list-group', 'border-0', 'rounded-0')
  state.feeds.forEach(({title, description}) => {
    const feedsListItem = document.createElement('li')
    feedsListItem.classList.add('list-group-item', 'border-0', 'border-end-0')
    const feedSubtitle = document.createElement('h3')
    feedSubtitle.classList.add('h6', 'm-0')
    feedSubtitle.textContent = title
    const feedDescription = document.createElement('p')
    feedDescription.classList.add('m-0', 'small', 'text-black-50')
    feedDescription.textContent = description

    feedsListItem.append(feedSubtitle, feedDescription)
    feedsList.prepend(feedsListItem)
  })
  feedsBodyDiv.append(feedsTitle)
  feedsMainDiv.append(feedsBodyDiv, feedsList)
  elements.feedsBlock.append(feedsMainDiv)
  
  // console.log(feedsMainDiv)
}
// renderFeeds(elements, state)

export const renderPosts = (elements, state) => {
  elements.postsBlock.innerHTML = ''
  const postsMainDiv = document.createElement('div')
  postsMainDiv.classList.add('card', 'border-0')
  const postsBodyDiv = document.createElement('div')
  postsBodyDiv.classList.add('card-body')
  const postsTitle = document.createElement('h2')
  postsTitle.classList.add('card-title', 'h4')
  postsTitle.textContent = i18nInstance.t('rss.posts')
  const postsList = document.createElement('ul')
  postsList.classList.add('list-group', 'border-0', 'rounded-0')
  
  state.posts.forEach(({ title, link }) => {
    const postsListItem = document.createElement('li')
    postsListItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')
  
    const tagA = document.createElement('a')
    tagA.setAttribute('href', link)
    tagA.classList.add('fw-bold')
    tagA.textContent = title
  
    const button = document.createElement('button')
    button.setAttribute('type', 'button')
    button.classList.add('btn', 'btn-outline-primary')
    button.setAttribute('data-bs-toggle', 'modal')
    button.setAttribute('data-bs-target', '#modal')
    button.textContent = i18nInstance.t('rss.linkBtn')
    button.addEventListener('click', (e) => {
      e.preventDefault()
      const modalTitle = document.querySelector('.modal-title')
      const modalBody = document.querySelector('.modal-body')
      console.log(modalBody)//делаю общий id у ссылки и у кнопки и при клике на кнопку достаю куда-то id кнопки, далее вытаскиваю по id объект из массива и использую данные объекта
    })
  
    postsListItem.append(tagA)
    postsListItem.append(button)
  //событие клик, которое меняет цвет ссылки 
    postsList.append(postsListItem)
  })
 


  postsBodyDiv.append(postsTitle)
  postsMainDiv.append(postsBodyDiv, postsList)
  elements.postsBlock.append(postsMainDiv)
}
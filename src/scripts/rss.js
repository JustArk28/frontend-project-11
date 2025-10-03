import axios from "axios";
import { i18nInstance } from "./app";
import { elements, renderFeeds, renderPosts } from "./render";
// import { state } from "./app";

const feedback = document.querySelector(".feedback");
const input = document.getElementById("url-input");

// const domParse = (content) => {
//   const parser = new DOMParser();
//   const parsedContent = parser.parseFromString(content, "text/xml");
//   const parsererror = parsedContent.querySelector("parsererror");
//   if (parsererror) {
//     feedback.classList.remove("text-success");
//     feedback.textContent = i18nInstance.t("feedback.noValidRss");
//     input.classList.remove("is-invalid");
//     feedback.classList.add("text-danger");
//     return parsererror;
//   }
//   feedback.textContent = i18nInstance.t("feedback.success");
//   feedback.classList.remove("text-danger");
//   feedback.classList.add("text-success");
//   input.classList.remove("is-invalid");
//   console.log("1", parsedContent);
//   return parsedContent;
// };

// let num = 0;
// const createPosts = (newDom) => {
//   const rssPostItems = newDom.querySelectorAll("item");
//   let newPosts = [];
//   rssPostItems.forEach((newPost) => {
//     const title = newPost.querySelector("title")?.textContent;
//     const link = newPost.querySelector("link")?.textContent;
//     const subtitle = newPost.querySelector("description")?.textContent;
//     const id = newPost.querySelector("pubDate")?.textContent + num++;
//     newPosts.push({ id, title, link, subtitle, viewed: false });
//   });
//   return newPosts;
// };

// export const rssData = () => {
//   // Формируем URL для прокси
//   const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(
//     state.website
//   )}`;

//   axios
//     .get(proxyUrl)
//     .then((response) => {
//       const newDom = domParse(response.data.contents);
//       const feedTitle = newDom.querySelector("title")?.textContent;
//       const feedDescription = newDom.querySelector("description")?.textContent;
//       state.feeds.push({ title: feedTitle, description: feedDescription });
//       console.log("fids", state.feeds);
//       state.posts = [...createPosts(newDom), ...state.posts];
//       renderPosts(elements, state);
//       renderFeeds(elements, state);
//       console.log(newDom);
//     })
//     .catch((error) => {
//       // handle error
//       console.log(error);
//     });

//   const getNewDom = () => {
//     axios
//       .get(proxyUrl)
//       .then((response) => {
//         const newDom = domParse(response.data.contents);
//         const newPostItems = newDom.querySelectorAll("item");
//         let arr = [];
//         newPostItems.forEach((post) => {
//           const title = post.querySelector("title")?.textContent;
//           arr.push(title);
//         });
//         const newItems = new Set([...arr]);
//         let result = [];
//         state.posts.forEach((item) => {
//           result.push(item.title);
//         });
//         const stateItems = new Set([...result]);

//         const newTitle = new Set(
//           [...newItems].filter((title) => !stateItems.has(title))
//         );
//         if (Array.from(newTitle).length > 0) {
//           // console.log('string', Array.from(newTitle).toString())
//           const newPostItems1 = newDom.querySelectorAll("item");
//           const newItems = [];
//           newPostItems1.forEach((item) => {
//             if (item.textContent.includes(Array.from(newTitle).toString())) {
//               const itemTitle = item.querySelector("title")?.textContent;
//               const itemLink = item.querySelector("link")?.textContent;
//               const itemSubtitle =
//                 item.querySelector("description")?.textContent;
//               const itemId = item.querySelector("pubDate")?.textContent + num++;
//               newItems.push({
//                 id: itemId,
//                 title: itemTitle,
//                 link: itemLink,
//                 subtitle: itemSubtitle,
//                 viewed: false,
//               });
//               state.posts = [...newItems, ...state.posts];
//               renderPosts(elements, state);
//             }
//           });
//         }
//         console.log(state);
//         // console.log(newDom);
//       })
//       .catch((error) => {
//         // handle error
//         console.log(error);
//       });
//     setTimeout(getNewDom, 5000);
//   };
//   setTimeout(getNewDom, 5000);
// };

// const getNewDom = () => {
//     if (state.links.length === 0) {
//         return
//     }   
//     state.links.forEach((link) => {
//         const proxyUrl1 = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`;
//           axios
//             .get(proxyUrl1)
//             .then((response) => {
//               const newDom = domParse(response.data.contents);
//               const newPostItems = newDom.querySelectorAll("item");
//               let arr = [];
//               newPostItems.forEach((post) => {
//                 const title = post.querySelector("title")?.textContent;
//                 arr.push(title);
//               });
//               const newItems = new Set([...arr]);
//               let result = [];
//               state.posts.forEach((item) => {
//                 result.push(item.title);
//               });
//               const stateItems = new Set([...result]);
      
//               const newTitle = new Set(
//                 [...newItems].filter((title) => !stateItems.has(title))
//               );
//               if (Array.from(newTitle).length > 0) {
//                 // console.log('string', Array.from(newTitle).toString())
//                 const newPostItems1 = newDom.querySelectorAll("item");
//                 const newItems = [];
//                 newPostItems1.forEach((item) => {
//                   if (item.textContent.includes(Array.from(newTitle).toString())) {
//                     const itemTitle = item.querySelector("title")?.textContent;
//                     const itemLink = item.querySelector("link")?.textContent;
//                     const itemSubtitle =
//                       item.querySelector("description")?.textContent;
//                     const itemId = item.querySelector("pubDate")?.textContent + num++;
//                     newItems.push({
//                       id: itemId,
//                       title: itemTitle,
//                       link: itemLink,
//                       subtitle: itemSubtitle,
//                       viewed: false,
//                     });
//                     state.posts = [...newItems, ...state.posts];
//                     renderPosts(elements, state);
//                   }
//                 });
//               }
//               console.log(state);
//               // console.log(newDom);
//             })
//             .catch((error) => {
//               // handle error
//               console.log(error);
//             });
//         })    
//           setTimeout(getNewDom, 5000);
//         };
//           setTimeout(getNewDom, 5000);
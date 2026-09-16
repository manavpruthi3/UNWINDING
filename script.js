const profileUrl = "https://www.instagram.com/unwinding_chapter/";
const postsContainer = document.getElementById("posts");
document.getElementById("year").textContent = new Date().getFullYear();

document.querySelector(".menu").addEventListener("click", () => {
  document.querySelector(".nav nav").classList.toggle("open");
});

async function loadPosts() {
  try {
    const response = await fetch("posts.json", {cache:"no-store"});
    if (!response.ok) return;
    const data = await response.json();
    if (!Array.isArray(data.posts) || !data.posts.length) return;

    postsContainer.innerHTML = "";
    data.posts.forEach(url => {
      const article = document.createElement("article");
      article.className = "post";
      article.innerHTML = `<blockquote class="instagram-media"
        data-instgrm-permalink="${url}"
        data-instgrm-version="14"
        style="background:#0d0d0c;border:0;margin:0 auto;max-width:540px;width:100%;"></blockquote>`;
      postsContainer.appendChild(article);
    });

    if (window.instgrm) window.instgrm.Embeds.process();
  } catch (e) {
    console.warn("Instagram post list could not be loaded.", e);
  }
}
loadPosts();

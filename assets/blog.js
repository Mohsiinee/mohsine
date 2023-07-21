let blogPosts = [
    {
      id: 1,
      title: "Electricity and computer science: importance and future",
      description: "Brief description of the blog article...",
      imageUrl: "/mohsine.dev/img/Blog-article-electricity and computer science.png",
      articleURL: "#",
      date: "2023-01-01",
    },
];

const blogContainer = document.querySelector(".blog-container");
let paginationContainer = document.querySelector(".pagination-container");

function createPost(post, index) {
    let postDiv = document.createElement("div");
    postDiv.classList.add("blog-post");
    if (index % 2 !== 0) {
      postDiv.classList.add("reverse-order");
    }
  
    let imageDiv = document.createElement("div");
    imageDiv.classList.add("post-image");
  
  
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("post-content");
  
    let textDiv = document.createElement("div");
  
    let h2 = document.createElement("h2");
    h2.textContent = post.title;
    textDiv.appendChild(h2);
  
    let p = document.createElement("p");
    p.textContent = post.description;
    textDiv.appendChild(p);
  
    contentDiv.appendChild(textDiv);
  
    let buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("post-buttons");
  
    let btnBoxDiv = document.createElement("div");
    btnBoxDiv.classList.add("read-btn-box");
  
    let readMoreBtn = document.createElement("a");
    readMoreBtn.href = post.articleURL;
    readMoreBtn.classList.add("read-btn");
    readMoreBtn.textContent = "Read more";
  
    btnBoxDiv.appendChild(readMoreBtn);
    buttonsDiv.appendChild(btnBoxDiv);
  
    let dateSpan = document.createElement("span");
    dateSpan.textContent = post.date;
    buttonsDiv.appendChild(dateSpan);
  
    let shareBtn = document.createElement("i");
    shareBtn.classList.add("fa-solid");
    shareBtn.classList.add("fa-share-from-square");
    
    let shareBtnText = document.createElement("p");
    shareBtnText.textContent = "Share";
    buttonsDiv.appendChild(shareBtnText);
    shareBtnText.appendChild(shareBtn);
  
    contentDiv.appendChild(buttonsDiv);
    postDiv.appendChild(imageDiv);
    postDiv.appendChild(contentDiv);
  
    return postDiv;
}

let currentPage = 1;
const postsPerPage = 3;
function displayPosts() {

    let startIndex = (currentPage - 1) * postsPerPage;
    let endIndex = startIndex + postsPerPage;

    blogContainer.innerHTML = '';

    let postsThisPage = blogPosts.slice(startIndex, endIndex);

    postsThisPage.forEach((post, index) => {
      let postElement = createPost(post, index);
      blogContainer.appendChild(postElement);
    });
}

function createPagination() {

    let totalPages = Math.ceil(blogPosts.length / postsPerPage);

    let paginationDiv = document.createElement('div');
    paginationDiv.classList.add('pagination');

    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.addEventListener('click', function() {
            currentPage = i;
            displayPosts();
        });
        paginationDiv.appendChild(pageButton);
    }
    paginationContainer.appendChild(paginationDiv);
}

window.onload = function() {
    displayPosts();
    createPagination();
}

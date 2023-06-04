let blogPosts = [
    {
      id: 1,
      title: "Blog Post Title 1",
      description: "Brief description of the blog post...",
      imageUrl: "https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png",
      date: "2023-01-01",
    },
    {
      id: 2,
      title: "Blog Post Title 2",
      description: "Brief description of the blog post...",
      imageUrl: "https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png",
      date: "2023-02-01",
    },
    {
        id: 3,
        title: "Blog Post Title 3",
        description: "Brief description of the blog post...",
        imageUrl: "https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png",
        date: "2023-03-01",
    },
    {
        id: 4,
        title: "Blog Post Title 4",
        description: "Brief description of the blog post...",
        imageUrl: "https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png",
        date: "2023-04-01",
    },
    // Add more blog posts here
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
  
    let img = document.createElement("img");
    img.src = post.imageUrl;
    imageDiv.appendChild(img);
  
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
    btnBoxDiv.classList.add("btn-box");
  
    let readMoreBtn = document.createElement("a");
    readMoreBtn.href = "#";
    readMoreBtn.classList.add("btn");
    readMoreBtn.textContent = "Read more";
  
    for (let i = 0; i < 4; i++) {
      let span = document.createElement("span");
      readMoreBtn.insertBefore(span, readMoreBtn.firstChild);
    }
  
    btnBoxDiv.appendChild(readMoreBtn);
    buttonsDiv.appendChild(btnBoxDiv);
  
    let dateSpan = document.createElement("span");
    dateSpan.textContent = post.date;
    buttonsDiv.appendChild(dateSpan);
  
    let shareBtn = document.createElement("button");
    shareBtn.classList.add("share");
    shareBtn.textContent = "Share";
    buttonsDiv.appendChild(shareBtn);
  
    contentDiv.appendChild(buttonsDiv);
    postDiv.appendChild(imageDiv);
    postDiv.appendChild(contentDiv);
  
    return postDiv;
}
  

let currentPage = 1;
const postsPerPage = 3;
function displayPosts() {
    // Calculate start and end indices of posts for this page
    let startIndex = (currentPage - 1) * postsPerPage;
    let endIndex = startIndex + postsPerPage;

    // Clear out the current posts in the blog container
    blogContainer.innerHTML = '';

    // Get the posts for this page
    let postsThisPage = blogPosts.slice(startIndex, endIndex);

    // Loop through the posts and add them to the page as before
    postsThisPage.forEach((post, index) => {
      let postElement = createPost(post, index);
      blogContainer.appendChild(postElement);
    });
}

function createPagination() {
    // Calculate the total number of pages
    let totalPages = Math.ceil(blogPosts.length / postsPerPage);

    // Create a div for the pagination
    let paginationDiv = document.createElement('div');
    paginationDiv.classList.add('pagination');

    // Create a button for each page
    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.addEventListener('click', function() {
            // When this button is clicked, set the current page and display the posts for this page
            currentPage = i;
            displayPosts();
        });
        paginationDiv.appendChild(pageButton);
    }

    // Add the pagination div to the pagination container
    paginationContainer.appendChild(paginationDiv);
}

window.onload = function() {
    displayPosts();
    createPagination();
}
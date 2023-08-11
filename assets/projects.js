const projects = [
    {
        category: "Programming",
        image: "../img/Chef Portfolio img.png",
        title: "Chef Portfolio",
        tag: "",
        modalurl: "case-study-chef-portfolio.html",
        id: 1
    },
    {
        category: "Programming",
        image: "../img/Tiler Portfolio img.png",
        title: "Tiler Portfolio",
        tag: "",
        modalurl: "case-study-chef-portfolio.html",
        id: 2
    },
    {
        category: "Electricity",
        image: "../img/SE.png",
        title: "motor control circuit",
        tag: "",
        modalurl: "case-study-1.html",
        id: 3
    },
];

function loadProjects(category) {
    const projectsContainer = document.querySelector('#projects-container');
    projectsContainer.innerHTML = ''; 

    for (let project of projects) {
        if (project.category === category) {
            let projectCard = `
            <div class="project-card">
                <div class="img-container"><img class="project-image" src="${project.image}"></div>
                <div class="txt-project">
                    <h3 class="project-title">${project.title}</h3>
                    <p>${project.tag}</p>
                    <button class="btn" onclick="openModal('${project.modalurl}')">
                        Case Study
                    </button>
                </div>
            </div>`;
            projectsContainer.insertAdjacentHTML('beforeend', projectCard);
        }
    }

    $(document).ready(function(){
        $('.projects-carousel').slick({
          dots: true,
          arrows: true,
          infinite: true,
          speed: 800,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                slidesToShow: 1
              }
            }
          ]
        });
    });           
}

loadProjects('Programming');

document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
        $('#projects-container').slick('unslick'); 
        loadProjects(e.target.dataset.category);
    });
});
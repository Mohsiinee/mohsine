const projects = [
    {
        category: "Programming",
        image: "https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png",
        title: "Programming Project 1",
        modalurl: "case-study-1.html",
        id: 1
    },
    {
        category: "Electricity",
        image: "https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png",
        title: "Electricity Project 1",
        modalurl: "case-study-1",
        id: 2
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
                <h3 class="project-title">${project.title}</h3>
                <p>Text here</p>

                <button class="btn" onclick="openModal('${project.modalurl}')">
                    Case Study
                </button>
            </div>`;
            projectsContainer.insertAdjacentHTML('beforeend', projectCard);
        }
    }

    $('#projects-container').slick({ 
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            },
        ]
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
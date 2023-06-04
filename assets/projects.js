const projects = [
    {
        category: "Programming",
        image: "https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png",
        title: "Programming Project 1",
        id: 1
    },
    {
        category: "Electricity",
        image: "https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png",
        title: "Electricity Project 1",
        id: 2
    },
    {
        category: "Programming",
        image: "https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png",
        title: "Programming Project 2",
        id: 3
    },
    {
        category: "Electricity",
        image: "https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png",
        title: "Electricity Project 2",
        id: 4
    },
    {
        category: "Programming",
        image: "https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png",
        title: "Programming Project 3",
        id: 5
    },
    {
        category: "Electricity",
        image: "https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png",
        title: "Electricity Project 3",
        id: 6
    },
    {
        category: "Programming",
        image: "https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png",
        title: "Programming Project 4",
        id: 7
    },
    {
        category: "Electricity",
        image: "https://webstyle.unicomm.fsu.edu/3.4/img/placeholders/ratio-pref-1-1.png",
        title: "Electricity Project 4",
        id: 8
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

                <div class="btn-box">
                <a class="btn">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Case Study
                </a>
            </div>
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
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
        modalurl: "case-study-1.html",
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
                <div class="txt-project">
                    <h3 class="project-title">${project.title}</h3>
                    <p>Text here</p>
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
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          adaptiveHeight: true,
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
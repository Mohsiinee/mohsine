document.addEventListener('DOMContentLoaded', function() {
    const software_projects = [
        {
            "id": 1,
            "image_url": "#",
            "page_url": "#",
            "tag": "#",
            "title": "#"
        },
    ];

    const electricity_projects = [
        {
            "id": 1,
            "image_url": "#",
            "page_url": "#",
            "tag": "#",
            "title": "#"
        },

    ];


    const swiper = new Swiper('#swiper', {
        loop: true,
        effect: 'fade',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        keyboard: {
            enabled: true
        },
        autoplay: {
            delay: 5000
        },
        
    });

    const populateProjects = (projects) => {
        let slides = '';
        projects.forEach((project) => {
            slides += `<div class="swiper-slide">
                         <img src="${project.image_url}" />
                         <div class="slider-info">
                            <h3>${project.title}</h3>
                            <p>${project.tag}</p>
                            <a href="${project.page_url}">Case Study</a>
                         </div>
                       </div>`;
        });
        document.querySelector('.swiper-wrapper').innerHTML = slides;
        swiper.update();
    };

    populateProjects(software_projects); // Populate with software projects by default

    document.getElementById('softwareBtn').addEventListener('click', function() {
        populateProjects(software_projects);
        this.classList.add('active');
        document.getElementById('electricityBtn').classList.remove('active');
    });

    document.getElementById('electricityBtn').addEventListener('click', function() {
        populateProjects(electricity_projects);
        this.classList.add('active');
        document.getElementById('softwareBtn').classList.remove('active');
    });
});

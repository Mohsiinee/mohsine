const feedbacks = [
    {
        name: "Client Name",
        photo: "#",
        review: " Paragraphe describing this section, Choosing the right professional for your project is crucial, and I believe I can be that choice for you. I bring to the table years of experience as an electrician and a programmer, two fields that require precision, creativity, and a deep understanding of technical details.",
        project: "Project : Client Project",
    },
];

function loadFeedbacks() {
    const slider = $('.client-slider');
    for (let feedback of feedbacks) {
        let slide = `
        <div class="client-slide">
            <div class="client-photo">
                <img src="${feedback.photo}" alt="${feedback.name}">
            </div>
            <div class="client-info">
                <h2 class="client-name">${feedback.name}</h2>
                <p class="review">"${feedback.review}"</p>
                <div class="extra-info">
                    <span class="project-name">${feedback.project}</span>
                    <span class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                    </span>
                </div>
            </div>
        </div>`;
        slider.append(slide);
    }

    slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
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
                    dots: true,
                    
                }
            },
        ]
    });
}

$(document).ready(function() {
    loadFeedbacks();
});

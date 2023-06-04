const feedbacks = [
    {
        name: "Client 1",
        photo: "https://www.mckinsey.com/~/media/mckinsey/our%20people/alexander%20weiss/alexander%20weiss_std_img.jpg",
        review: " Paragraphe describing this section, Choosing the right professional for your project is crucial, and I believe I can be that choice for you. I bring to the table years of experience as an electrician and a programmer, two fields that require precision, creativity, and a deep understanding of technical details.",
        project: "Project : www.mohsine.dev",
    },
    {
        name: "Client 2",
        photo: "https://www.mckinsey.com/~/media/mckinsey/our%20people/alexander%20weiss/alexander%20weiss_std_img.jpg",
        review: "I'm really satisfied with the project outcome.",
        project: "Project 2",
    },
    {
        name: "Client 3",
        photo: "https://www.mckinsey.com/~/media/mckinsey/our%20people/alexander%20weiss/alexander%20weiss_std_img.jpg",
        review: "Highly professional team and superb customer service.",
        project: "Project 3",
    },
];

function loadFeedbacks() {
    const slider = $('.slider');
    for (let feedback of feedbacks) {
        let slide = `
        <div class="slide">
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
    });
}

$(document).ready(function() {
    loadFeedbacks();
});

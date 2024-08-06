function smoothScroll() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });

    // Each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // Tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length 
                ? locoScroll.scrollTo(value, 0, 0) 
                : locoScroll.scroll.instance.scroll.y;
        },
        // We don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { 
                top: 0, 
                left: 0, 
                width: window.innerWidth, 
                height: window.innerHeight 
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! 
        // So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile.
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

//smoothScroll();


const artworks = [
    // Charcoal artworks (10)
    { id: 1, title: 'Charcoal', category: 'charcoal', image: 'assets/img/artworks/charcoal/horse2.jpg', quantity: 1 },
    { id: 2, title: 'Charcoal', category: 'charcoal', image: 'assets/img/artworks/charcoal/charcoal2.jpg', quantity: 1 },
    { id: 3, title: 'Charcoal', category: 'charcoal', image: 'assets/img/artworks/charcoal/eye.jpg', quantity: 1 },
    { id: 4, title: 'Charcoal', category: 'charcoal', image: 'assets/img/artworks/charcoal/lip.jpg', quantity: 1 },
    { id: 5, title: 'Charcoal', category: 'charcoal', image: 'assets/img/artworks/charcoal/light.jpg', quantity: 1 },
    { id: 6, title: 'Charcoal', category: 'charcoal', image: 'assets/img/artworks/charcoal/horse.jpg', quantity: 1 },  
    { id: 7, title: 'Charcoal', category: 'charcoal', image: 'assets/img/artworks/charcoal/1000000.jpg', quantity: 1 },    
    { id: 8, title: 'Charcoal', category: 'charcoal', image: 'assets/img/artworks/charcoal/potraittwo.jpg', quantity: 1 },
    //{ id: 9, title: 'Charcoal', category: 'charcoal', image: 'assets/img/artworks/charcoal/lion.jpg', quantity: 1 },
    { id: 10, title: 'Charcoal', category: 'charcoal', image: 'assets/img/artworks/charcoal/1000000119.jpg', quantity: 1 },
    

    // Oil artworks (2)
    { id: 11, title: 'Oil Painting', category: 'oil', image: 'assets/img/artworks/oil/20240527_183224.jpg', quantity: 1 },
    { id: 12, title: 'Oil Painting', category: 'oil', image: 'assets/img/artworks/oil/1000005435.jpg', quantity: 1 },

    // Acrylic artworks (4)
    { id: 13, title: 'Acrylic', category: 'acrylic', image: 'assets/img/artworks/acrylic/1687176339362.jpg', quantity: 1 },
    { id: 14, title: 'Acrylic', category: 'acrylic', image: 'assets/img/artworks/acrylic/1000000216.jpg', quantity: 1 },
    { id: 15, title: 'Acrylic', category: 'acrylic', image: 'assets/img/artworks/acrylic/1000000218.jpg', quantity: 1 },
    { id: 16, title: 'Acrylic', category: 'acrylic', image: 'assets/img/artworks/acrylic/1000000215.jpg', quantity: 1 },
    

    // Mandala artworks (1)
    { id: 17, title: 'Mandala Art', category: 'mandala', image: 'assets/img/artworks/mandala/1000004736.jpg', quantity: 1 }
];

function displayArtworks(filteredArtworks) {
    const container = document.getElementById('artwork-container');
    
    container.innerHTML = '';
    filteredArtworks.forEach(artwork => {
        const artworkDiv = document.createElement('div');
        artworkDiv.classList.add('artwork');
        artworkDiv.innerHTML = `
            <img src="${artwork.image}" alt="${artwork.title}" style="width:100%">
            <p>${artwork.title}</p>
            
        `;
        container.appendChild(artworkDiv);
    });
}

function filterArtworks(category) {
    const container = document.getElementById('artwork-container');
    container.classList.remove('fade-in');
    container.classList.add('fade-out');
    setTimeout(() => {
        if (category === 'all') {
            displayArtworks(artworks);
        } else {
            const filteredArtworks = artworks.filter(artwork => artwork.category === category);
            displayArtworks(filteredArtworks);
        }
        container.classList.remove('fade-out');
        container.classList.add('fade-in');
    }, 500); // Adjust timing as needed for animation
}

// Initial display of all artworks
displayArtworks(artworks);


function setActiveButton(activeButtonId) {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(activeButtonId).classList.add('active');
}

// Event listeners for category filter buttons
document.getElementById('btn-all').addEventListener('click', function() {
    filterArtworks('all');
    setActiveButton('btn-all');
});

document.getElementById('btn-charcoal').addEventListener('click', function() {
    filterArtworks('charcoal');
    setActiveButton('btn-charcoal')
});

document.getElementById('btn-oil').addEventListener('click', function() {
    filterArtworks('oil');
    setActiveButton('btn-oil')
});

document.getElementById('btn-acrylic').addEventListener('click', function() {
    filterArtworks('acrylic');
    setActiveButton('btn-acrylic')
});

document.getElementById('btn-mandala').addEventListener('click', function() {
    filterArtworks('mandala');
    setActiveButton('btn-mandala')
});


function pageAnimation() {
    gsap.from(".filter-btn", {
        y: 10,
        opacity: 0,
        duration: 0.5,
         
    });
}

function workAnimation() {
    gsap.from(".artwork", {
        y: 10,
        opacity: 0,
        duration: 0.5,
       
    });
}

window.addEventListener('load', () => {
   // Spinner handling
    const spinner = document.querySelector('.loader');
    
    spinner.style.display = "none"
   
   
   
    pageAnimation();
    workAnimation();

    
});

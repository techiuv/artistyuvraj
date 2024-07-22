function saveDeviceDimensionsToCookie() {
    // Get device width and height
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // Function to set a cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Set cookies for width and height
    setCookie("deviceWidth", width, 30); // Cookie valid for 30 days
    setCookie("deviceHeight", height, 30); // Cookie valid for 30 days

    //console.log(`Device dimensions saved to cookies: Width=${width}, Height=${height}`);
}

// Call the function to save dimensions to cookie
saveDeviceDimensionsToCookie();

// Function to open a new window with specific attributes
function openNewWindow(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

async function shareLink(link, title) {
    if (navigator.share) {
        try {
            await navigator.share({
                title: title,
                //text: text,
                url: link,
            });
            console.log('Link shared successfully');
        } catch (error) {
            console.error('Error sharing link:', error);
        }
    } else {
        alert('Web Share API not supported in this browser.');
    }
}


function limitChars(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
}

function limitParagraphsInClass(className, maxLength, maxParagraphs) {
  const paragraphs = document.querySelectorAll(`.${className}`);
  paragraphs.forEach((paragraph, index) => {
    if (index < maxParagraphs) {
      paragraph.textContent = limitChars(paragraph.textContent, maxLength);
    }
  });
}

const className = 'yt-tittle';      
const maxLength = 23;           // Set the maximum length of text
const maxParagraphs = 4;         // Set the maximum number of paragraphs to limit
limitParagraphsInClass(className, maxLength, maxParagraphs);


document.getElementById('year').innerHTML = new Date().getFullYear();

// Initialize Swiper
var swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        // when window width is >= 640px
        640: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});


function h() {
    gsap.from(".heading", {
        y:10 ,
        duration: 1,
        /* scrollTrigger: {
            trigger: "#work",
            scroller: "#main",
            start: "top 80%",            
            markers: true,  
            scrub: 2,
        } */
    });
}



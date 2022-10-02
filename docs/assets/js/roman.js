// Scroll Line
const scrollLine = document.getElementById("scroll-line");

var scrollInterval1 = setInterval(() => scrollLine.style.opacity = "1", 1000)
var scrollInterval2 = setInterval(() => scrollLine.style.opacity = "0", 6000)

// Navbar Visibility
// Sections Visibity
const sections = document.getElementsByTagName('section');
const bodyMargin = getComputedStyle(document.documentElement).getPropertyValue('--body-margin');
const navbarHeight = '-' + getComputedStyle(document.documentElement).getPropertyValue('--navbar-height').trim();

let prevScrollpos = window.pageYOffset;

window.onscroll = () => {
    // Scroll-line
    clearInterval(scrollInterval1);
    clearInterval(scrollInterval2);
    scrollLine.style.opacity = '0';

    // visibility of sections
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("nav").style.top = bodyMargin;
    } else {
        document.getElementById("nav").style.top = navbarHeight;
    }
    prevScrollpos = currentScrollPos;

    for (const section of sections) {
        if (isElementStartingToBeInViewport(section, 175)) {
            section.style.opacity = 1;
        }
    }

}

// Burger Menu
const burgerIcon = document.getElementById("hamburger")
const burgerOpenIcon = document.getElementById("hamburger-open")
const sidebar = document.getElementById("sidebar")

burgerIcon.onclick = () => {
    burgerOpenIcon.style.display = 'block';
    sidebar.style.width = '300px';
}
burgerOpenIcon.onclick = () => {
    burgerOpenIcon.style.display = 'none';
    sidebar.style.width = '0';
}

// Socials visibility
const socialsContainer = document.getElementById("socials-icon-container")
const connectWithMe = document.getElementById("connect-with-me")

var lastTimeoutId;

connectWithMe.onmouseover = () => {
    clearTimeout(lastTimeoutId)
    socialsContainer.style.opacity = '1';
    socialsContainer.style.pointerEvents = 'all'
}
connectWithMe.onmouseout = () => {
    socialsContainer.style.opacity = '0';
    lastTimeoutId = setTimeout(() => socialsContainer.style.pointerEvents = 'none', 1000)
}

socialsContainer.onmouseover = () => {
    clearTimeout(lastTimeoutId)
    socialsContainer.style.opacity = '1';
    socialsContainer.style.pointerEvents = 'all'
}
socialsContainer.onmouseout = () => {
    socialsContainer.style.opacity = '0';
    lastTimeoutId = setTimeout(() => socialsContainer.style.pointerEvents = 'none', 1000)
}

// compass
const north = document.getElementById("north")
var northpoints = north.getBoundingClientRect();
const Xorigin = northpoints.left + (northpoints.width / 2)
const Yorigin = northpoints.top + (northpoints.height)

const south = document.getElementById("south")
const compass = document.getElementById("compass")
window.onmousemove = (e) => {
    let Xmouse = e.pageX
    let Ymouse = e.pageY

    const firstAngle = Math.atan2(Ymouse - Yorigin, Xmouse - Xorigin) + 1.55;

    north.style.transform = 'rotate(' + (firstAngle) + 'rad) translateY(-70px)'
    south.style.transform = 'rotate(' + (Math.PI + firstAngle) + 'rad) translateY(-70px)'
}

window.onresize = () => {
    sidebar.style.width = '0';
    northpoints = north.getBoundingClientRect();
}



// functions
function isElementStartingToBeInViewport(el, offset) {
    const rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        (rect.top + offset) <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function openWorkplace(evt, workplace) {
    // Declare all variables
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.opacity = "0";
        tabcontent[i].style.zIndex = "0";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(workplace).style.opacity = "1";
    document.getElementById(workplace).style.zIndex = "1";
    evt.currentTarget.className += " active";
}



document.getElementById("defaultOpen").click();
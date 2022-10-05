// Scroll Line
const scrollLine = document.getElementById("scroll-line");

var scrollInterval1 = setInterval(() => scrollLine.style.opacity = "1", 1000)
var scrollInterval2 = setInterval(() => scrollLine.style.opacity = "0", 6000)

// Navbar Visibility
// Sections Visibity
const sections = document.getElementsByTagName('section');
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
        document.getElementById("nav").style.top = '20px';
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

    setTimeout(() => {
        window.onclick = (event) => {
            const clickWasOutsideNavigation = !sidebar.contains(event.target);

            if (clickWasOutsideNavigation) {
                burgerOpenIcon.onclick();
            }
        }
    });
}
burgerOpenIcon.onclick = () => {
    burgerOpenIcon.style.display = 'none';
    sidebar.style.width = '0';
    window.onclick = undefined;
}

const links = document.querySelectorAll('.sidebar a');
links.forEach(l => l.onclick = burgerOpenIcon.onclick)


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
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const letterNorth = document.getElementById("letter-north")
const letterEast = document.getElementById("letter-east")
const letterSouth = document.getElementById("letter-south")
const letterWest = document.getElementById("letter-west")

const north = document.getElementById("north")
var northpoints = north.getBoundingClientRect();
var Xorigin = northpoints.left + (northpoints.width / 2)
var Yorigin = northpoints.top + (northpoints.height)

const south = document.getElementById("south")
const compass = document.getElementById("compass")
window.onmousemove = (e) => {
    let Xmouse = e.pageX
    let Ymouse = e.pageY

    const firstAngle = Math.atan2(Ymouse - Yorigin, Xmouse - Xorigin) + 1.55;

    north.style.transform = 'rotate(' + (firstAngle) + 'rad) translateY(-70px)'
    south.style.transform = 'rotate(' + (Math.PI + firstAngle) + 'rad) translateY(-70px)'

    
    
    let distanceNorth = getDistanceBetweenElementAndRotatingPoint(letterNorth)

    letterNorth.style.fontSize = clamp(180 - distanceNorth, 25, 50) + 'px';
    letterEast.style.fontSize = clamp(180 - getDistanceBetweenElementAndRotatingPoint(letterEast), 25, 50) + 'px';
    letterSouth.style.fontSize = clamp(180 - getDistanceBetweenElementAndRotatingPoint(letterSouth), 25, 50) + 'px';
    letterWest.style.fontSize = clamp(180 - getDistanceBetweenElementAndRotatingPoint(letterWest), 25, 50) + 'px';
}

function getDistanceBetweenElementAndRotatingPoint(element) {
    let x1 = north.getBoundingClientRect().x + (north.getBoundingClientRect().width / 2)
    let y1 = north.getBoundingClientRect().y + (north.getBoundingClientRect().height / 2)

    let x2 = element.getBoundingClientRect().x;
    let y2 = element.getBoundingClientRect().y;

    let a = x1 - x2;
    let b = y1 - y2;

    return Math.hypot(a,b);
}

window.onresize = () => {
    sidebar.style.width = '0';
    northpoints = north.getBoundingClientRect();
    Xorigin = northpoints.left + (northpoints.width / 2)
    Yorigin = northpoints.top + (northpoints.height)
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
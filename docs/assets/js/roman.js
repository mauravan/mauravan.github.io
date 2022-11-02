// Scroll Line
// TODO: Can be done with animation
const scrollLine = document.getElementById("scroll-line");

var scrollInterval1 = setInterval(() => scrollLine.style.opacity = "1", 1000)
var scrollInterval2 = setInterval(() => scrollLine.style.opacity = "0", 6000)

// Skills
const skillsParent = document.getElementById('skills');

var skills = {
    "java": 80,
    "spring": 80,
    "javascript": 75,
    "react": 70,
    "html": 70,
    "css": 60,
}

Object.entries(skills).forEach(([skillName, percentage]) => {
    let container = document.createElement('div');
    container.classList.add('skill-container')

    let skillbar = document.createElement('div');
    skillbar.classList.add('skill-bar');
    skillbar.id = skillName;
    
    let percentageText = document.createElement('span')
    percentageText.innerText = percentage + "%";

    container.appendChild(percentageText)
    
    let text = document.createElement('div')
    text.classList.add('skill-name')
    text.innerText = skillName;

    let left = document.createElement('div');
    left.appendChild(skillbar)
    left.appendChild(text)

    container.appendChild(left)

    skillsParent.appendChild(container);
});

// Navbar Visibility
// Sections Visibity
const sections = document.getElementsByTagName('section');
const navbarHeight = '-' + getComputedStyle(document.documentElement).getPropertyValue('--navbar-height').trim();

let prevScrollpos = window.scrollY;

window.onscroll = () => {
    // Scroll-line
    clearInterval(scrollInterval1);
    clearInterval(scrollInterval2);
    scrollLine.style.opacity = '0';

    // visibility of sections
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("nav").style.top = '0px';
    } else {
        document.getElementById("nav").style.top = navbarHeight;
    }
    prevScrollpos = currentScrollPos;

    for (const section of sections) {
        if (isElementStartingToBeInViewport(section, 175)) {
            section.style.opacity = 1;
        }
    }

    if(isElementStartingToBeInViewport(skillsParent, 50)) {
        skillsParent.querySelectorAll('.skill-bar').forEach((bar) => {
            bar.style.width = skills[bar.id] + '%';
        })
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

    burgerIcon.style.display = 'none'
}
burgerOpenIcon.onclick = () => {
    burgerOpenIcon.style.display = 'none';
    sidebar.style.width = '0';
    window.onclick = undefined;

    burgerIcon.style.display = 'block'
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

window.onresize = () => {
    sidebar.style.width = '0';
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


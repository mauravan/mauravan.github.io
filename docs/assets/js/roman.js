const auraContainer = document.getElementById("aura");

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const numberOfAuras = Math.ceil(vw / 100);

for (let i = 0; i < numberOfAuras; i++) {
    const initialShadow = `rgb(75, ${Math.random() * 255 + 100}, ${Math.random() * 255 + 60}) 0px 0px 100px 50px`

    const aura = document.createElement('span');
    aura.classList.add('aura');
    aura.style.marginTop = (-Math.random() * 100) - 400 + 'px';
    aura.style.boxShadow = initialShadow;
    aura.style.animation = `topup ${Math.random() * 10000 + 3000}ms linear infinite`;
    aura.style.borderRadius = `${Math.random() * 25}% ${Math.random() * 25}% ${Math.random() * 25}% ${Math.random() * 25}%`;
    aura.setAttribute('initialShadow', initialShadow);

    auraContainer.appendChild(aura)
}

const star = document.getElementById("star");
let boxShadow = []

for (let i = 0; i < 150; i++) {
    let height;
    if (i > 75) {
        height = Math.random() * 100;
    } else {
        height = Math.random() * 150;
    }


    boxShadow.push(`${Math.random() * 100}vw ${height}vh ${Math.random() * 5}px ${Math.random() * 2}px rgb(255,255,255,0.5)`);
}

star.style.boxShadow = boxShadow.join(",")

// HorizontalScroll
const tabContainer = document.getElementById("tab-container");
tabContainer.addEventListener('wheel', (evt) => {
    const scrolledToEnd = tabContainer.scrollWidth - (tabContainer.scrollLeft + tabContainer.offsetWidth) === 0;
    const scrolledToStart = tabContainer.scrollLeft === 0;

    const shouldScrollRight = evt.deltaY > 0;
    const shouldScrollLeft = evt.deltaY < 0;

    if ((shouldScrollRight && !scrolledToEnd) || (shouldScrollLeft && !scrolledToStart)) {
        evt.preventDefault();
        tabContainer.scrollLeft += evt.deltaY;
    }
}, { passive: false });

// blinks
let array = [];
const badges = document.getElementsByClassName('badges-div');
Array.from(badges).forEach(badge => {
    let next = array.pop();
    if (next === undefined) {
        array = [2, 3, 4, 5, 6, 7, 8].sort(el => 0.5 - Math.random());
        next = array.pop()
    }

    badge.style.animationDelay = next + "s";
});

// Navbar Visibility
// Sections Visibity
const sections = document.getElementsByTagName('section');
const navbarHeight = '-' + getComputedStyle(document.documentElement).getPropertyValue('--navbar-height').trim();

let prevScrollpos = window.scrollY;

const scrollLine = document.getElementById("scroll-line");
const emailMe = document.getElementById("email-me");
const connectWithMe = document.getElementById("connect-with-me");

window.addEventListener('scroll', () => {
    // Scroll-line
    scrollLine.style.display = 'none'

    // visibility of sections
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("nav").style.top = '0px';
    } else {
        if (currentScrollPos > 0) {
            document.getElementById("nav").style.top = navbarHeight;
        }
    }
    prevScrollpos = currentScrollPos;

    if (currentScrollPos > 600) {
        emailMe.style.opacity = 1;
        connectWithMe.style.opacity = 1
    }

    if (currentScrollPos === 0) {
        emailMe.style.opacity = 0;
        connectWithMe.style.opacity = 0;
        document.getElementById("nav").style.top = "-125px";
    }


    for (const section of sections) {
        if (isElementStartingToBeInViewport(section, 175)) {
            section.style.opacity = 1;
        }
    }
}, { passive: true });

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

window.addEventListener('mousemove', (e) => {
    let Xmouse = e.pageX
    let Ymouse = e.pageY

    const Xright = Xmouse;
    const Xtop = Ymouse;

    Array.from(auraContainer.children).forEach((child) => {
        const { left, right, top, bottom } = child.getBoundingClientRect()

        if (Xright > left && Xright < (left + 100) && Xtop > top && Xtop < bottom) {
            if (child.classList.contains("aura")) {
                child.style.boxShadow = `0px 0px 100px 50px rgb(${Math.random() * 40 + 200}, ${Math.random() * 160}, ${Math.random() * 40}) `;
            }
        } else {
            child.style.boxShadow = child.getAttribute('initialShadow')
        }

    });
}, { passive: true })

window.addEventListener('resize', () => {
    sidebar.style.width = '0';
}, { passive: true });

// functions
function isElementStartingToBeInViewport(el, offset) {
    const rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        (rect.top + offset) <= (window.innerHeight || document.documentElement.clientHeight)
    );
}
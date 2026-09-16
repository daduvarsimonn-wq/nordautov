/* =========================================================
   NORD AUTO — 3D EXPERIENCE
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
/* =========================================================
   LOADER
========================================================= */
const loader = document.querySelector(".loader");
setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => {
        loader.remove();
    }, 800);
}, 1900);
/* =========================================================
   MOBILE MENU
========================================================= */
const menuButton = document.querySelector(".menu-button");
const closeMenu = document.querySelector(".close-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-navigation a");
function openMenu() {
    mobileMenu.classList.add("active");
    document.body.classList.add("menu-open");
}
function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
}
menuButton.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeMobileMenu);
mobileLinks.forEach(link => {
    link.addEventListener("click", closeMobileMenu);
});
document.addEventListener("keydown", event => {
    if(event.key === "Escape") {
        closeMobileMenu();
    }
});
/* =========================================================
   NAV SCROLL
========================================================= */
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
    if(window.scrollY > 80) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});
/* =========================================================
   CUSTOM CURSOR
========================================================= */
const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");
if(window.innerWidth > 700) {
    document.addEventListener("mousemove", event => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
        cursorDot.style.left = `${event.clientX}px`;
        cursorDot.style.top = `${event.clientY}px`;
    });
    document.querySelectorAll(
        "a,button,.service-card,.why-card,.gallery-item,.review"
    ).forEach(element => {
        element.addEventListener("mouseenter", () => {
            cursor.style.width = "65px";
            cursor.style.height = "65px";
        });
        element.addEventListener("mouseleave", () => {
            cursor.style.width = "35px";
            cursor.style.height = "35px";
        });
    });
}
/* =========================================================
   SERVICE 3D TILT
========================================================= */
if(window.innerWidth > 900) {
    document.querySelectorAll(".service-card").forEach(card => {
        card.addEventListener("mousemove", event => {
            const rect = card.getBoundingClientRect();
            const x =
                (event.clientX - rect.left) / rect.width - .5;
            const y =
                (event.clientY - rect.top) / rect.height - .5;
            card.style.transform =
                `perspective(1100px)
                 rotateY(${x * 5}deg)
                 rotateX(${y * -5}deg)
                 translateY(-5px)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform =
                "perspective(1100px) rotateY(0) rotateX(0) translateY(0)";
        });
    });
}
/* =========================================================
   SCROLL REVEAL
========================================================= */
const revealItems = document.querySelectorAll(
    ".service-card,.why-card,.review,.gallery-item,.diagnostic-list > div"
);
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) return;
            entry.target.classList.add("reveal");
            requestAnimationFrame(() => {
                entry.target.classList.add("visible");
            });
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: .12
    }
);
revealItems.forEach(item => observer.observe(item));
/* =========================================================
   SMOOTH LINKS
========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const targetID = link.getAttribute("href");
        if(targetID === "#") return;
        const target = document.querySelector(targetID);
        if(!target) return;
        event.preventDefault();
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});
/* =========================================================
   THREE.JS 3D CAR
========================================================= */
const sceneContainer = document.getElementById("car-scene");
if(sceneContainer && typeof THREE !== "undefined") {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(
        0x020406,
        0.035
    );
    /* CAMERA */
    const camera = new THREE.PerspectiveCamera(
        42,
        window.innerWidth / window.innerHeight,
        .1,
        100
    );
    camera.position.set(
        5.8,
        2.6,
        7.8
    );
    /* RENDERER */
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );
    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
    renderer.outputEncoding =
        THREE.sRGBEncoding;
    sceneContainer.appendChild(
        renderer.domElement
    );
    /* LIGHTS */
    const ambient = new THREE.HemisphereLight(
        0x8db9df,
        0x05070a,
        1.7
    );
    scene.add(ambient);
    const blueLight = new THREE.PointLight(
        0x2d9cff,
        15,
        18
    );
    blueLight.position.set(
        3,
        4,
        3
    );
    scene.add(blueLight);
    const whiteLight = new THREE.PointLight(
        0xffffff,
        7,
        20
    );
    whiteLight.position.set(
        -4,
        4,
        4
    );
    scene.add(whiteLight);
    const rearLight = new THREE.PointLight(
        0x174e82,
        10,
        15
    );
    rearLight.position.set(
        0,
        2,
        -5
    );
    scene.add(rearLight);
    /* CAR GROUP */
    const car = new THREE.Group();
    scene.add(car);
    /* MATERIALS */
    const bodyMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x101820,
            metalness: .92,
            roughness: .18
        });
    const glassMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x081018,
            metalness: .35,
            roughness: .08,
            transparent: true,
            opacity: .72
        });
    const blueMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x2d9cff,
            emissive: 0x0b4d82,
            emissiveIntensity: 1.5,
            metalness: .8,
            roughness: .18
        });
    const rubberMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x030405,
            metalness: .1,
            roughness: .85
        });
    const chromeMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xc7d0d8,
            metalness: 1,
            roughness: .18
        });
    /* BODY */
    const bodyGeometry =
        new THREE.BoxGeometry(
            5.6,
            .72,
            2.2,
            8,
            3,
            5
        );
    const body =
        new THREE.Mesh(
            bodyGeometry,
            bodyMaterial
        );
    body.position.y = 1.05;
    car.add(body);
    /* HOOD */
    const hoodGeometry =
        new THREE.BoxGeometry(
            2.25,
            .28,
            2.08,
            4,
            2,
            4
        );
    const hood =
        new THREE.Mesh(
            hoodGeometry,
            bodyMaterial
        );
    hood.position.set(
        1.8,
        1.42,
        0
    );
    hood.rotation.z = -.025;
    car.add(hood);
    /* ROOF */
    const roofGeometry =
        new THREE.BoxGeometry(
            2.65,
            .32,
            1.82,
            4,
            2,
            4
        );
    const roof =
        new THREE.Mesh(
            roofGeometry,
            bodyMaterial
        );
    roof.position.set(
        -.45,
        1.82,
        0
    );
    roof.rotation.z = -.03;
    car.add(roof);
    /* WINDSHIELD */
    const windshieldGeometry =
        new THREE.BoxGeometry(
            1.05,
            .1,
            1.72
        );
    const windshield =
        new THREE.Mesh(
            windshieldGeometry,
            glassMaterial
        );
    windshield.position.set(
        .55,
        1.72,
        0
    );
    windshield.rotation.z = -.52;
    car.add(windshield);
    /* REAR GLASS */
    const rearGlass =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                .8,
                .1,
                1.72
            ),
            glassMaterial
        );
    rearGlass.position.set(
        -1.35,
        1.7,
        0
    );
    rearGlass.rotation.z = .65;
    car.add(rearGlass);
    /* WHEELS */
    function createWheel(x, z) {
        const wheelGroup =
            new THREE.Group();
        wheelGroup.position.set(
            x,
            .72,
            z
        );
        const tire =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    .72,
                    .72,
                    .35,
                    48
                ),
                rubberMaterial
            );
        tire.rotation.x =
            Math.PI / 2;
        wheelGroup.add(tire);
        const rim =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    .48,
                    .48,
                    .37,
                    32
                ),
                chromeMaterial
            );
        rim.rotation.x =
            Math.PI / 2;
        wheelGroup.add(rim);
        const center =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    .15,
                    .15,
                    .4,
                    24
                ),
                blueMaterial
            );
        center.rotation.x =
            Math.PI / 2;
        wheelGroup.add(center);
        const brake =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    .34,
                    .34,
                    .39,
                    32
                ),
                blueMaterial
            );
        brake.rotation.x =
            Math.PI / 2;
        brake.position.y = .01;
        wheelGroup.add(brake);
        car.add(wheelGroup);
        return wheelGroup;
    }
    const wheelFL =
        createWheel(
            1.65,
            1.08
        );
    const wheelFR =
        createWheel(
            1.65,
            -1.08
        );
    const wheelRL =
        createWheel(
            -1.75,
            1.08
        );
    const wheelRR =
        createWheel(
            -1.75,
            -1.08
        );
    /* HEADLIGHTS */
    const headlightMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x7fc9ff,
            emissiveIntensity: 5
        });
    function createLight(z) {
        const light =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    .75,
                    .08,
                    .35
                ),
                headlightMaterial
            );
        light.position.set(
            2.85,
            1.2,
            z
        );
        car.add(light);
    }
    createLight(.72);
    createLight(-.72);
    /* BLUE UNDERGLOW */
    const glowMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x168dff,
            transparent: true,
            opacity: .32
        });
    const glow =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                5.5,
                2
            ),
            glowMaterial
        );
    glow.rotation.x =
        -Math.PI / 2;
    glow.position.y = .18;
    car.add(glow);
    /* FLOOR */
    const floor =
        new THREE.Mesh(
            new THREE.CircleGeometry(
                12,
                64
            ),
            new THREE.MeshBasicMaterial({
                color: 0x07111a,
                transparent: true,
                opacity: .45
            })
        );
    floor.rotation.x =
        -Math.PI / 2;
    floor.position.y = .05;
    scene.add(floor);
    /* TECH RINGS AROUND CAR */
    const ringMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x2d9cff,
            transparent: true,
            opacity: .25
        });
    const ring =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                3.9,
                .008,
                8,
                100
            ),
            ringMaterial
        );
    ring.rotation.x =
        Math.PI / 2;
    ring.position.y =
        .15;
    scene.add(ring);
    /* MOUSE */
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener(
        "mousemove",
        event => {
            mouseX =
                (event.clientX /
                    window.innerWidth - .5);
            mouseY =
                (event.clientY /
                    window.innerHeight - .5);
        }
    );
    /* ANIMATION */
    const clock =
        new THREE.Clock();
    function animate() {
        requestAnimationFrame(
            animate
        );
        const time =
            clock.getElapsedTime();
        car.rotation.y +=
            (
                mouseX * .35 -
                car.rotation.y
            ) * .025;
        car.rotation.x +=
            (
                mouseY * -.08 -
                car.rotation.x
            ) * .025;
        car.position.y =
            Math.sin(time * .8) * .08;
        wheelFL.rotation.z =
            time * .2;
        wheelFR.rotation.z =
            time * .2;
        wheelRL.rotation.z =
            time * .2;
        wheelRR.rotation.z =
            time * .2;
        ring.rotation.z =
            time * .12;
        blueLight.position.x =
            3 + Math.sin(time) * 2;
        renderer.render(
            scene,
            camera
        );
    }
    animate();
    /* RESIZE */
    window.addEventListener(
        "resize",
        () => {
            camera.aspect =
                window.innerWidth /
                window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );
        }
    );
}
/* =========================================================
   PARALLAX SECTIONS
========================================================= */
window.addEventListener("scroll", () => {
    const scroll =
        window.scrollY;
    const rings =
        document.querySelectorAll(
            ".tech-ring"
        );
    rings.forEach((ring,index) => {
        ring.style.transform =
            `translateY(${scroll * (index + 1) * .025}px)
             rotate(${scroll * .03 * (index + 1)}deg)`;
    });
});
/* =========================================================
   YEAR
========================================================= */
const year =
    document.getElementById("year");
if(year) {
    year.textContent =
        new Date().getFullYear();
}
});
/* =========================================================
   RHUANZIN PORTFOLIO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PROJECT VISIT TRACKING
    ====================================================== */

    const projectButtons = document.querySelectorAll("[data-visit-project]");
    const projectContactLinks = document.querySelectorAll("[data-contact-project]");
    const selectedProjectMessage = document.getElementById("selectedProjectMessage");

    const projectNames = {
        nova: "NOVA X1",
        noctis: "NOCTIS Performance Club",
        velora: "VELORA Motors"
    };

    projectButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const project = button.dataset.visitProject;

            localStorage.setItem("lastVisitedProject", project);
            localStorage.setItem(`visited-${project}`, "true");
        });
    });


    /* =====================================================
       UPDATE CONTACT LINKS AFTER PROJECT VISIT
    ====================================================== */

    function updateProjectContactLinks() {
        projectContactLinks.forEach((link) => {
            const project = link.dataset.contactProject;
            const hasVisited = localStorage.getItem(`visited-${project}`);

            if (hasVisited === "true") {
                link.classList.add("visited");

                link.innerHTML = `
                    Liked ${projectNames[project]}?
                    <strong>Let's talk →</strong>
                `;
            }
        });
    }


    /* =====================================================
       UPDATE MAIN CONTACT MESSAGE
    ====================================================== */

    function updateSelectedProjectMessage() {
        const lastVisitedProject = localStorage.getItem("lastVisitedProject");

        if (!lastVisitedProject || !selectedProjectMessage) {
            return;
        }

        const projectName = projectNames[lastVisitedProject];

        selectedProjectMessage.innerHTML = `
            You recently explored
            <strong>${projectName}</strong>.
            If that's close to what you have in mind,
            we already have a good starting point.
        `;

        selectedProjectMessage.classList.add("active");
    }


    updateProjectContactLinks();
    updateSelectedProjectMessage();


    /* =====================================================
       CONTACT PROJECT SELECTION
    ====================================================== */

    projectContactLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const project = link.dataset.contactProject;

            localStorage.setItem("selectedContactProject", project);

            setTimeout(() => {
                if (!selectedProjectMessage) return;

                selectedProjectMessage.innerHTML = `
                    Project reference:
                    <strong>${projectNames[project]}</strong>.
                    Great. That gives us somewhere to start.
                `;

                selectedProjectMessage.classList.add("active");
            }, 250);
        });
    });


    /* =====================================================
       PORTFOLIOCEPTION
    ====================================================== */

    const portfolioceptionTrigger =
        document.getElementById("portfolioceptionTrigger");

    const portfolioceptionReveal =
        document.getElementById("portfolioceptionReveal");

    if (portfolioceptionTrigger && portfolioceptionReveal) {

        portfolioceptionTrigger.addEventListener("click", () => {

            const isOpen =
                portfolioceptionTrigger.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                portfolioceptionTrigger.setAttribute("aria-expanded", "false");

                portfolioceptionReveal.hidden = true;

                portfolioceptionTrigger.textContent = "Which one?";
            } else {
                portfolioceptionTrigger.setAttribute("aria-expanded", "true");

                portfolioceptionReveal.hidden = false;

                portfolioceptionTrigger.textContent =
                    "Yep. This one.";

                requestAnimationFrame(() => {
                    portfolioceptionReveal.classList.add("portfolioception-open");
                });
            }

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements = document.querySelectorAll(
        `
        .section-heading,
        .project-content,
        .portfolioception-content,
        .contact-content,
        .referral-content
        `
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =====================================================
       HEADER EFFECT ON SCROLL
    ====================================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* =====================================================
       COPY PORTFOLIO LINK
    ====================================================== */

    const copyPortfolioButton =
        document.getElementById("copyPortfolioButton");

    if (copyPortfolioButton) {

        copyPortfolioButton.addEventListener("click", async () => {

            const originalText = copyPortfolioButton.textContent;

            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                copyPortfolioButton.textContent =
                    "Link Copied ✓";

            } catch (error) {

                const temporaryInput =
                    document.createElement("textarea");

                temporaryInput.value = window.location.href;

                document.body.appendChild(temporaryInput);

                temporaryInput.select();

                document.execCommand("copy");

                temporaryInput.remove();

                copyPortfolioButton.textContent =
                    "Link Copied ✓";
            }

            setTimeout(() => {
                copyPortfolioButton.textContent = originalText;
            }, 2200);

        });

    }


    /* =====================================================
       SHARE PORTFOLIO
    ====================================================== */

    const sharePortfolioButton =
        document.getElementById("sharePortfolioButton");

    if (sharePortfolioButton) {

        sharePortfolioButton.addEventListener("click", async () => {

            if (navigator.share) {

                try {

                    await navigator.share({
                        title: "Rhuanzin | Front-End Developer",
                        text: "Check out my front-end development portfolio.",
                        url: window.location.href
                    });

                } catch (error) {
                    // User may simply close the share menu.
                }

            } else {

                try {

                    await navigator.clipboard.writeText(
                        window.location.href
                    );

                    const originalText =
                        sharePortfolioButton.textContent;

                    sharePortfolioButton.textContent =
                        "Link Copied ✓";

                    setTimeout(() => {
                        sharePortfolioButton.textContent =
                            originalText;
                    }, 2200);

                } catch (error) {

                    alert(
                        "Copy this link:\n\n" +
                        window.location.href
                    );
                }
            }

        });

    }


  /* =====================================================
   CONTACT BUTTONS
====================================================== */

const upworkContact =
    document.getElementById("upworkContact");

const discordContact =
    document.getElementById("discordContact");


function handleContactChoice(platform) {

    const selectedProject =
        localStorage.getItem("selectedContactProject")
        ||
        localStorage.getItem("lastVisitedProject");

    if (selectedProject) {

        localStorage.setItem(
            "contactProject",
            selectedProject
        );

    }

    localStorage.setItem(
        "preferredContactPlatform",
        platform
    );

}


if (upworkContact) {

    upworkContact.addEventListener("click", () => {

        handleContactChoice("upwork");

    });

}


if (discordContact) {

    discordContact.addEventListener("click", () => {

        handleContactChoice("discord");

    });

}

    /* =====================================================
       PROJECT SECTION ACTIVE STATE
    ====================================================== */

    const projectSections =
        document.querySelectorAll(".project-section");

    const projectObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("active-project");
                    } else {
                        entry.target.classList.remove("active-project");
                    }

                });

            },
            {
                threshold: 0.35
            }
        );

    projectSections.forEach((section) => {
        projectObserver.observe(section);
    });


    /* =====================================================
       KEYBOARD ACCESSIBILITY FOR PORTFOLIOCEPTION
    ====================================================== */

    if (portfolioceptionTrigger) {

        portfolioceptionTrigger.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {
                    event.preventDefault();
                    portfolioceptionTrigger.click();
                }

            }
        );

    }

});
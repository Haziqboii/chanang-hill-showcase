/* ============================================================
   CHANANG HILL IDCT SHOWCASE — Main JavaScript
   Handles: scroll animations, navigation, tabs, counters, video
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initScrollReveal();
    initNavigation();
    initTechTabs();
    initCounters();
    initScrollIndicator();
    initSmoothScrollLinks();
    initBackToTop();
    initScrollProgress();
    initComparisonSlider();
    initExpTabs();
    initVisionCards();
    initHeroVideo();
});

/* ---- Vision Cards Interactive Glow ---- */
function initVisionCards() {
    const cards = document.querySelectorAll('.glass-card-dark');
    
    cards.forEach(card => {
        const glow = card.querySelector('.card-glow');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            glow.style.left = `${x - 50}px`;
            glow.style.top = `${y - 50}px`;
            glow.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
    });
}

window.addEventListener('load', () => {
    initParticles();
});

/* ---- Scroll Reveal Animations ---- */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-up');

    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/* ---- Navigation ---- */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('navHamburger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Scroll state
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Add scrolled class
        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;

        // Active section tracking
        updateActiveNav(sections, links);
    }, { passive: true });

    // Hamburger toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click (mobile)
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

function updateActiveNav(sections, links) {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}


/* ---- Tech Tabs ---- */
function initTechTabs() {
    const tabs = document.querySelectorAll('.tech-tab');
    const panels = document.querySelectorAll('.tech-panel');

    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab;

            // Deactivate all
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => {
                p.classList.remove('active');
                p.style.display = 'none';
            });

            // Activate clicked
            tab.classList.add('active');
            const targetPanel = document.getElementById(`panel-${targetId}`);
            if (targetPanel) {
                targetPanel.style.display = 'grid';
                // Trigger reflow for animation
                void targetPanel.offsetHeight;
                targetPanel.classList.add('active');
            }
        });
    });
}


/* ---- Experience Tabs ---- */
function initExpTabs() {
    const tabs = document.querySelectorAll('.exp-tab');
    const panels = document.querySelectorAll('.exp-panel');

    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.expTab;

            // Deactivate all
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Activate clicked
            tab.classList.add('active');
            const targetPanel = document.getElementById(`exp-panel-${targetId}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

/* ---- Animated Counters ---- */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count, 10);
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, target) {
    const duration = 1500;
    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startValue + (target - startValue) * eased);

        el.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ---- Scroll Indicator ---- */
function initScrollIndicator() {
    const indicator = document.getElementById('scrollIndicator');

    if (!indicator) return;

    indicator.addEventListener('click', () => {
        const challenge = document.getElementById('challenge');
        if (challenge) {
            challenge.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Fade out scroll indicator after scrolling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            indicator.style.opacity = '0';
            indicator.style.pointerEvents = 'none';
        } else {
            indicator.style.opacity = '';
            indicator.style.pointerEvents = '';
        }
    }, { passive: true });
}

/* ---- Smooth Scroll for Anchor Links ---- */
function initSmoothScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);

            if (target) {
                const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ---- Video Player Controls (for when real videos are added) ---- */
function initVideoPlayer() {
    const video = document.getElementById('voicesVideo');
    const playBtn = document.getElementById('videoPlayBtn');
    const muteBtn = document.getElementById('videoMuteBtn');
    const progressBar = document.getElementById('videoProgressBar');

    if (!video || !playBtn) return;

    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20"><rect x="5" y="4" width="3" height="12" fill="currentColor"/><rect x="12" y="4" width="3" height="12" fill="currentColor"/></svg>';
        } else {
            video.pause();
            playBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="6,3 6,17 17,10" fill="currentColor"/></svg>';
        }
    });

    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
        });
    }

    if (progressBar) {
        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }
}

/* ---- Parallax effect for hero (subtle) ---- */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-video-bg');
    if (hero && window.scrollY < window.innerHeight) {
        const speed = 0.3;
        hero.style.transform = `translateY(${window.scrollY * speed}px)`;
    }
}, { passive: true });

/* ---- Loader ---- */
function initLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loaded');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }, 6000);
    }
}

/* ---- Scroll Progress ---- */
function initScrollProgress() {
    const progress = document.getElementById('scroll-progress');
    if (!progress) return;

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progress.style.width = scrollPercent + '%';
    }, { passive: true });
}

/* ---- Back To Top ---- */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ---- Hero Particles ---- */
function initParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * height; // Distribute initially
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.size = Math.random() * 2 + 0.5;
            this.speedY = Math.random() * 0.5 + 0.1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;

            if (this.y < -10 || this.x < -10 || this.x > width + 10) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 168, 83, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles based on screen width
    const particleCount = Math.min(Math.floor(width / 15), 80);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* ---- Before/After Comparison Slider ---- */
function initComparisonSlider() {
    const slider = document.getElementById('comparisonSlider');
    const beforeImage = document.querySelector('.comparison-before');
    const handle = document.getElementById('comparisonHandle');

    if (!slider || !beforeImage || !handle) return;

    let isDragging = false;

    const moveSlider = (e) => {
        if (!isDragging) return;

        let clientX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
        let rect = slider.getBoundingClientRect();
        let x = clientX - rect.left;
        let width = rect.width;

        // Boundaries
        if (x < 0) x = 0;
        if (x > width) x = width;

        let percentage = (x / width) * 100;

        beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
        handle.style.left = percentage + '%';
    };

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        slider.style.cursor = 'ew-resize';
        moveSlider(e);
        e.preventDefault();
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            slider.style.cursor = 'col-resize';
        }
    });

    window.addEventListener('mousemove', moveSlider);

    // Touch support
    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        moveSlider(e);
    });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    window.addEventListener('touchmove', moveSlider);
}



// Before/After toggler animation
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('digitalToggle');
    if (toggle) {
        toggle.addEventListener('change', (e) => {
            const befores = document.querySelectorAll('.before-stat');
            const afters = document.querySelectorAll('.after-stat');
            if (e.target.checked) {
                befores.forEach(b => b.classList.add('hidden'));
                afters.forEach(a => {
                    a.classList.remove('hidden');
                    let valStr = a.dataset.val || a.innerText;
                    let val = parseInt(valStr);
                    if (!isNaN(val)) {
                        let i = 0;
                        a.dataset.val = valStr; // store original
                        const suffix = valStr.includes('%') ? '%' : '';
                        const interval = setInterval(() => {
                            i += Math.ceil(val / 20);
                            if (i >= val) { clearInterval(interval); a.innerText = val + suffix; }
                            else a.innerText = i + suffix;
                        }, 20);
                    }
                });
            } else {
                befores.forEach(b => b.classList.remove('hidden'));
                afters.forEach(a => a.classList.add('hidden'));
            }
        });
        document.querySelectorAll('.after-stat').forEach(a => a.dataset.val = a.innerText);
    }
});
/* ---- Hero Video Sound Toggle ---- */
function initHeroVideo() {
    const video = document.getElementById('heroVideo');
    const toggle = document.getElementById('videoSoundToggle');
    if (!video || !toggle) return;

    const toggleText = toggle.querySelector('.toggle-text');

    toggle.addEventListener('click', () => {
        video.muted = !video.muted;
        toggle.classList.toggle('unmuted', !video.muted);
        
        if (video.muted) {
            toggleText.textContent = 'Sound: Off';
        } else {
            toggleText.textContent = 'Sound: On';
            video.play();
        }
    });

    // Autoplay Fail-safe
    const startVideo = () => {
        // Play hero
        video.play().catch(err => console.log("Autoplay waiting..."));
        
        // Play all tech videos
        const techVideos = document.querySelectorAll('.tech-video');
        techVideos.forEach(v => {
            v.play().catch(err => {});
        });
    };

    window.addEventListener('load', startVideo);
    document.addEventListener('touchstart', startVideo, { once: true });
    document.addEventListener('click', startVideo, { once: true });
}

const tabsContainer = document.querySelector('.tabs');
const viewsContainer = document.querySelector('.views');
const addTabButton = document.getElementById('add-tab');
const urlInput = document.getElementById('url-input');
const goButton = document.getElementById('go-button');
const backButton = document.querySelector('.address-bar button:nth-child(1)');
const forwardButton = document.querySelector('.address-bar button:nth-child(2)');
const reloadButton = document.querySelector('.address-bar button:nth-child(3)');

let tabCount = 1;

function createTab(url = '/static/iframe.html#https://google.com') {
    const tabId = `tab${tabCount++}`;
    const tabButton = document.createElement('div');
    tabButton.className = 'tab-button';
    tabButton.dataset.tab = tabId;
    tabButton.textContent = 'New Tab';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-tab';
    closeButton.textContent = '×';
    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTab(tabId);
    });
    
    tabButton.appendChild(closeButton);
    tabButton.addEventListener('click', () => activateTab(tabId));
    tabsContainer.insertBefore(tabButton, addTabButton);
    
    const view = document.createElement('div');
    view.className = 'view';
    view.id = tabId;
    view.innerHTML = `<iframe src="${url}" onload="updateTabTitleFavicon('${tabId}', this)"></iframe>`;
    viewsContainer.appendChild(view);
    
    activateTab(tabId);
}

function activateTab(tabId) {
    document.querySelectorAll('.tab-button').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function deleteTab(tabId) {
    if (document.querySelectorAll('.tab-button:not(#add-tab)').length > 1) {
        const tabToDelete = document.querySelector(`[data-tab="${tabId}"]`);
        const viewToDelete = document.getElementById(tabId);
        
        const remainingTabs = document.querySelectorAll('.tab-button:not(#add-tab)');
        const nextTab = remainingTabs[remainingTabs.length - 1].dataset.tab;
        
        tabToDelete.remove();
        viewToDelete.remove();
        
        activateTab(nextTab);
    }
}

function sanitizeUrl(input) {
    let url = input.trim().toLowerCase();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
    }
    return `/static/iframe.html#${url}`;
}

function updateTabTitleFavicon(tabId, iframe) {
    try {
        const tabButton = document.querySelector(`[data-tab="${tabId}"]`);
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        
        tabButton.textContent = iframeDocument.title || 'New Tab';
        tabButton.appendChild(tabButton.querySelector('.close-tab'));
        
        const faviconLink = iframeDocument.querySelector("link[rel~='icon']");
        if (faviconLink) {
            const favicon = document.createElement('img');
            favicon.src = faviconLink.href;
            favicon.className = 'tab-favicon';
            tabButton.prepend(favicon);
        }
    } catch (e) {}
}

function handleSearch() {
    const sanitizedUrl = sanitizeUrl(urlInput.value);
    const activeTab = document.querySelector('.tab-button.active');
    if (activeTab) {
        const tabId = activeTab.dataset.tab;
        const iframe = document.querySelector(`#${tabId} iframe`);
        iframe.src = sanitizedUrl;
    } else {
        createTab(sanitizedUrl);
    }
}

goButton.addEventListener('click', handleSearch);
urlInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

addTabButton.addEventListener('click', () => createTab());
createTab();

backButton.addEventListener('click', () => {
    const activeTab = document.querySelector('.tab-button.active');
    if (activeTab) {
        const iframe = document.querySelector(`#${activeTab.dataset.tab} iframe`).contentWindow.history;
        if (iframe.length > 1) iframe.back();
    }
});

forwardButton.addEventListener('click', () => {
    const activeTab = document.querySelector('.tab-button.active');
    if (activeTab) {
        const iframe = document.querySelector(`#${activeTab.dataset.tab} iframe`).contentWindow.history;
        iframe.forward();
    }
});

reloadButton.addEventListener('click', () => {
    const activeTab = document.querySelector('.tab-button.active');
    if (activeTab) {
        const iframe = document.querySelector(`#${activeTab.dataset.tab} iframe`);
        iframe.src = iframe.src;
    }
});
        let lastTime = 0;
        const throttleDelay = 10;
        const crosshair = document.querySelector('.crosshair');
        let crosshairPosition = { x: 0, y: 0 };
        let targetPosition = { x: 0, y: 0 };
        const lerpSpeed = 0.2;

        let cursorSize = 30;
        let cursorOpacity = 1;

        document.addEventListener('mousemove', function (e) {
            const currentTime = new Date().getTime();
            if (currentTime - lastTime >= throttleDelay) {
                lastTime = currentTime;
                targetPosition.x = e.clientX + window.scrollX;
                targetPosition.y = e.clientY + window.scrollY;
            }
        });

        function updateCursor() {
            const deltaX = targetPosition.x - crosshairPosition.x;
            const deltaY = targetPosition.y - crosshairPosition.y;

            crosshairPosition.x += deltaX * lerpSpeed;
            crosshairPosition.y += deltaY * lerpSpeed;

            crosshair.style.left = (crosshairPosition.x - cursorSize / 6) + 'px';
            crosshair.style.top = (crosshairPosition.y - cursorSize / 6) + 'px';
            crosshair.style.width = cursorSize + 'px';
            crosshair.style.height = cursorSize + 'px';
            crosshair.style.opacity = cursorOpacity;

            requestAnimationFrame(updateCursor);
        }

        updateCursor();

        const buttons = document.querySelectorAll('.views');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                cursorSize = 0;
                crosshair.style.transition = "width 0.3s, height 0.3s, opacity 0.3s";
                crosshair.style.left = (crosshairPosition.x - cursorSize -100) + 'px';
                crosshair.style.top = (crosshairPosition.y - cursorSize -100) + 'px';
            });

            button.addEventListener('mouseleave', () => {
                cursorSize = 30;
                cursorOpacity = 1;
                crosshair.style.transition = "width 0.3s, height 0.3s, opacity 0.3s";
            }); 
        });
        const particleContainer = document.getElementById('particle-container');

        function createParticle() {
            const particle = document.createElement('div');
            const size = Math.random() * 5 + 2; 
            const startX = Math.random() * window.innerWidth;
            const greenShades = ['#24ec24', '#03d803', '#029902', '#02a002', '#4df54d'];

            particle.style.cssText = `
                position: absolute;
                bottom: 0;
                left: ${startX}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background-color: ${greenShades[Math.floor(Math.random() * greenShades.length)]};
                opacity: ${Math.random() * 0.8 + 0.2};
                animation: moveParticle ${Math.random() * 3 + 2}s linear;
            `;

            particleContainer.appendChild(particle);

            particle.addEventListener('animationend', () => particle.remove());
        }

        setInterval(() => {
            if (document.hidden) return;
            createParticle();
        }, 200);

        const style = document.createElement('style');
        style.textContent = `
        @keyframes moveParticle {
            0% {
                transform: translate(0, 0) rotate(0deg);
            }
            100% {
                transform: translate(calc(-50vw + 100%), calc(-100vh)) rotate(360deg);
            }
        }
        `;
        document.head.appendChild(style);
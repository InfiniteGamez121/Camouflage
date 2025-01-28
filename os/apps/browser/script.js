const tabsContainer = document.querySelector('.tabs');
const viewsContainer = document.querySelector('.views');
const addTabButton = document.getElementById('add-tab');
const urlInput = document.getElementById('url-input');
const goButton = document.getElementById('go-button');

let tabCount = 1;

function createTab(url = '/static/iframe.html#https://google.com') {
    const tabId = `tab${tabCount++}`;
    const tabButton = document.createElement('div');
    tabButton.className = 'tab-button';
    tabButton.dataset.tab = tabId;
    tabButton.textContent = `Tab ${tabCount - 1}`;
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
    view.innerHTML = `<iframe src="${url}"></iframe>`;
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
    const tabs = document.querySelectorAll('.tab-button').length - 1;
    if (tabs > 1) {
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

goButton.addEventListener('click', () => {
    const sanitizedUrl = sanitizeUrl(urlInput.value);
    const activeTab = document.querySelector('.tab-button.active');
    if (activeTab) {
        const tabId = activeTab.dataset.tab;
        const iframe = document.querySelector(`#${tabId} iframe`);
        iframe.src = sanitizedUrl;
    } else {
        createTab(sanitizedUrl);
    }
});

addTabButton.addEventListener('click', () => createTab());
createTab();

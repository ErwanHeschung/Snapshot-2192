import './pages/menu/menu.page';

const routes: Record<string, string> = {
    '/': 'menu-page',
    '/game': 'game-page',
};

function router() {
    const path = location.hash.replace('#', '') || '/';
    const app = document.getElementById('app-root');
    if (!app) return;

    const component = routes[path];
    if (component) {
        app.innerHTML = `<${component}></${component}>`;
    } else {
        app.innerHTML = `<h1>404 Not Found</h1>`;
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

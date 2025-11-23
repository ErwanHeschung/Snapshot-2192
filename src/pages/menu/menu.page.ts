import menuHtml from './menu.page.html?raw';
import menuCss from './menu.page.css?inline';
import { BaseComponent } from '../../shared/base.component';

export class MenuPage extends BaseComponent {
    constructor() {
        super(menuHtml, menuCss);
    }
}

customElements.define('menu-page', MenuPage);

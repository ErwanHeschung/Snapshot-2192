export abstract class BaseComponent extends HTMLElement {
    protected shadow: ShadowRoot;

    constructor(htmlContent: string, cssContent?: string) {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        // Injecter CSS
        if (cssContent) {
            const style = document.createElement('style');
            style.textContent = cssContent;
            this.shadow.appendChild(style);
        }

        // Injecter HTML
        const template = document.createElement('template');
        template.innerHTML = htmlContent;
        this.shadow.appendChild(template.content.cloneNode(true));

        this.onInit();
    }

    protected onInit(): void { }
}

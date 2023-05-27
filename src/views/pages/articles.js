import { html, render } from 'lit-html';
import { gotoRoute, anchorRoute } from '../../Router';
import Auth from '../../Auth';
import Utils from '../../Utils';
import Toast from '../../Toast';
import App from '../../App'
import ArticleAPI from '../../ArticleAPI';



class ArticleView {
  async init() {
    document.title = 'Articles';
    this.articles = null;
    this.render();
    Utils.pageIntroAnim();
    this.getArticles();
  }

  async getArticles() {
    try {
      this.articles = await ArticleAPI.getArticles();
      this.articles = this.articles.filter(article => article.status === 'approved');
      this.render();
    } catch (err) {
      Toast.show(err, 'error');
    }
  }

  renderParagraphs(paragraphs) {
    return paragraphs.map(p => html`<p>${p}</p>`);
  }

  formatContentIntoParagraphs(content) {
    // Split the content by double line breaks to identify paragraphs
    const paragraphs = content.split('\n\n');

    // Return the formatted paragraphs
    return this.renderParagraphs(paragraphs);
  }

  render() {
    const template = html`
      <va-app-header user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
        <div class="cards-col">
          ${this.articles === null
            ? html``
            : this.articles.map(
                article => html`
                  <sl-card class="article-card">
                    <img
                      src="${App.apiBase}/images/${article.heroImage}"
                      alt="${article.title}"
                      slot="image"
                    />
                    <h2>${article.title}</h2>
                    <p>${this.formatContentIntoParagraphs(article.content)}</p>
                  </sl-card>
                `
              )}
        </div>
      </div>
    `;
    render(template, document.querySelector('#root'));
  }
}

export default new ArticleView();
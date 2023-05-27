import { html, render } from 'lit-html';
import Auth from '../../Auth';
import Utils from '../../Utils';
import Toast from '../../Toast';
import App from '../../App';
import ArticleAPI from '../../ArticleAPI';

class ReviewView {
  constructor() {
    this.articles = null;
  }

  async init() {
    document.title = 'Review';
    this.render();
    Utils.pageIntroAnim();
    await this.getArticles();
  }

  async getArticles() {
    try {
      // Check if the user is an editor
      if (Auth.currentUser.accessLevel !== 2) {
        throw new Error('Sorry, you are not an editor yet');
      }
  
      const articles = await ArticleAPI.getArticles();
      this.articles = articles.filter(article => article.status === 'pending');
      this.render();
    } catch (err) {
      Toast.show(err, 'error');
      console.log(Toast.show);
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

  async updateArticleStatusHandler(articleId, status) {
    try {
      const updatedArticle = await ArticleAPI.updateArticle(articleId, { status });
      this.articles = await ArticleAPI.getArticles();
      this.articles = this.articles.filter(article => article.status === 'pending');
      Toast.show('Profile updated');
    } catch (err) {
      Toast.show(err, 'error');
    }
    this.render();
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
                  <sl-card class="article-card" data-article-id="${article._id}">
                    <img
                      src="${App.apiBase}/images/${article.heroImage}"
                      alt="${article.title}"
                      slot="image"
                    />
                    <h2>${article.title}</h2>
                    <p>${this.formatContentIntoParagraphs(article.content)}</p>
                    <div>
                      <sl-button class="approve-btn" @click="${() => this.updateArticleStatusHandler(article._id, 'approved')}">Approve</sl-button>
                    </div>
                    <div>
                      <sl-button class="reject-btn" @click="${() => this.updateArticleStatusHandler(article._id, 'pending')}">Reject</sl-button>
                    </div>
                  </sl-card>
                `
              )}
        </div>
      </div>
    `;
  
    render(template, document.querySelector('#root'));
  }
}

export default new ReviewView();

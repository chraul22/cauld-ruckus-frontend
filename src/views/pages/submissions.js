import App from './../../App';
import Auth from './../../Auth';
import { html, render } from 'lit-html';
import { anchorRoute, gotoRoute } from './../../Router';
import Utils from './../../Utils';
import Subs from '../../Subs';
import ArticleAPI from '../../ArticleAPI';

class SubmissionsView {
  init() {
    document.title = 'Submission';
    this.render();
    Utils.pageIntroAnim();
  }

  articleSubmitHandler(e) {
    e.preventDefault();
    const submitBtn = document.querySelector('.sub-article');
    submitBtn.setAttribute('loading', '');
    const formData = e.detail.formData;

    ArticleAPI.submitArticles(formData, () => {
      submitBtn.removeAttribute('loading');
    });
  }

  render() {
    const template = html`
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
        <h3 class="--heading-color">
          Hey ${Auth.currentUser.firstName}! Just below is where you can submit an article and our super talented and sexy editors will look over it soon!
        </h3>
        <sl-form class="form-submit" @sl-submit="${this.articleSubmitHandler}">
          <div class="input-group">
            <sl-input name="Submission" type="text" placeholder="Working Title" required></sl-input>
          </div>
          <div class="input-group">
            <sl-textarea name="Submission" type="text" placeholder="Paste your well written, well edited 'art' here..." required></sl-textarea>
          </div>
          <sl-button class="sub-article" type="primary" @click="${this.articleSubmitHandler}">Submit, if it's not awful!</sl-button>
        </sl-form>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new SubmissionsView();

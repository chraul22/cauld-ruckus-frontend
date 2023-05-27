import App from './../../App'
import { html, render } from 'lit-html'
import { anchorRoute, gotoRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class SignUpView {
  init() {
    document.title = 'Sign Up'
    this.render()
    Utils.pageIntroAnim()
  }

  signUpSubmitHandler(e) {
    e.preventDefault()
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')
    const formData = e.detail.formData

    // sign up using Auth
    Auth.signUp(formData, () => {
      submitBtn.removeAttribute('loading')
    })
  }
  render() {
    const template = html`
      <div class="page-content page-centered">
        <div class="signinup-box">
          <img class="signinup-logo" src="/images/logo.svg">
                  <sl-form class="form-signup dark-theme" @sl-submit=${this.signUpSubmitHandler}>
            <div class="input-group">
              <sl-input name="firstName" type="text" placeholder="First Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="lastName" type="text" placeholder="Last Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="email" type="email" placeholder="Email" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="password" type="password" placeholder="Password" required toggle-password></sl-input>
            </div>
            <div class='signinup-container'>
              <sl-button class="submit-btn" type="primary" submit style="width: 100%;">Sign Up</sl-button>
            </div>
          </sl-form>
          <div class="signup-link">
            <p>Have an account? <a href="/signin" @click=${anchorRoute}>Sign In</a></p>
          </div>
        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new SignUpView()

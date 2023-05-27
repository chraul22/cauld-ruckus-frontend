import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from '../../UserAPI'
import Toast from '../../Toast'

class aboutUsView {
  init(){
    document.title = 'About Us'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser()
  }

  async updateCurrentUser(){
    try {
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, {newUser: false}, 'json')
      console.log('user updated')
      console.log(updatedUser)
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){

    const template = html`
      <va-app-header user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>About Us</h1>
        <p>The Ruckus is a curated comedy website dedicated to just sharing and enjoying original, funny content. Our site is for comedy writers who want to showcase their talent and make people laugh.</p> 
        <p>We welcome any submissions as long as they are funny.  
        <p> We take comedy pretty seriously. So dont be disheartened or get verbal with us if we didn&apos;t want to publish something you wrote - it just wasn&apos;t for us. Read what we have published and have another crack at it.</p>
        <p>Whether you&apos;re an aspiring comedian, a seasoned writer, or not sure what the big plastic thing with squiggles on it does, our team of editors carefully reviews every submission to ensure that only the funniest and most original content makes it onto The Ruckus.
        <p>A couple of rules:</p>
        <ol>
          <li>It&apos;s got to be original - we don&apos;t want last week's meme. Or meme related content in general. We&apos;re terminally online, so if you stole it from somewhere, chances are we&apos;ve seen it.</li>
          <li>Don&apos;t be a jerk. If it&apos;s punching down on a group of people (LGBTQIA+, minority groups etc) don&apos;t send it to us.</li>
          <li>Just be funny. We don&apos;t care if it&apos;s political satire or a book-review of Lorem Ipsum placeholder text. Just give us something we haven&apos;t seen before.</li>
        </ol>
      </p>
      <p>So you think you&apos;re funny hotshot? Wanna try to write a little joke? Head to our submissions page ...</p>
          
      <sl-button type="primary" @click=${() => gotoRoute('/submissions')}>Let me see the submissions page</sl-button>
      <sl-button type="primary" @click=${() => gotoRoute('/')}>Let me read these 'jokes' you speak of</sl-button>
    </div>
  </div>    
    `
    render(template, App.rootEl)
  }
}


export default new aboutUsView()
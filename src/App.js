import Router from './Router'
import Auth from './Auth'
import Toast from './Toast'

class App {
  constructor(){
    this.name = "TheRuckus"
    this.version = "1.0.0"
    this.apiBase = "https://cauld-ruckus-backend.herokuapp.com"
    this.rootEl = document.getElementById("root")
  }
  
  init() { 
    console.log("App.init")
    
    // Toast init
    Toast.init()   
    
    // Authentication check    
    Auth.check(() => {
      // authenticated! init Router
      Router.init()
    })    
  }
}

export default new App()


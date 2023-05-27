import App from './App'
import Router, { gotoRoute } from './Router'
import splash from './views/partials/splash'
import {html, render } from 'lit-html'
import Toast from './Toast'

class Subs {

constructor(){
    this.currentUser = {}
  }

// import articles router---------------------------------------

async submitArticle(userData, fail = false){  
	const response = await fetch(`${App.apiBase}/articles`, {
	  method: 'POST',      
	  body: content,
	})
  
	// if response not ok
	if(!response.ok){      
	  // console log error
	  const err = await response.json()
	  if(err) console.log(err)
	  // show error      
	  Toast.show(`Problem submitting article: ${response.status}`)   
	  // run fail() functon if set
	  if(typeof fail == 'function') fail()
	}
	/// sign up success - show toast and redirect to sign in page
	Toast.show('You made a submission on the internet!')        
	// redirect to signin
	gotoRoute('/')
  }

}

export default new Subs()
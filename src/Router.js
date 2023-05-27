// import views
import homeView from './views/pages/articles'
import fourOFourView from './views/pages/404'
import signinView from './views/pages/signin'
import signupView from './views/pages/signup'
import profileView from './views/pages/profile'
import editProfileView from './views/pages/editProfile'
import aboutUsView from './views/pages/aboutUs'
import submissionsView from './views/pages/submissions'
import reviewView from './views/pages/review'


// define routes
const routes = {
	'/': homeView,
	'/aboutus': aboutUsView,	
	'/submissions': submissionsView,
	'/review': reviewView,
	'404' : fourOFourView,
	'/signin': signinView,
	'/signup': signupView,
	'/profile': profileView,
	'/editProfile': editProfileView	
}

class Router {
	constructor(){
		this.routes = routes
	}
	
	init(){
		// initial call
		this.route(window.location.pathname)

		// on back/forward
		window.addEventListener('popstate', () => {
			this.route(window.location.pathname)
		})
	}
	
route(fullPathname) {
  // Extract path without params
  const pathname = fullPathname.split('?')[0];
  const route = this.routes[pathname];

  if (route) {
    // If route exists, run init() of the view
    route.init();
  } else {
    // Show 404 view instead
    this.routes['404'].init();
  }
}

	gotoRoute(pathname){
		window.history.pushState({}, pathname, window.location.origin + pathname);
		this.route(pathname)
	}	
}

// create appRouter instance and export
const AppRouter = new Router()
export default AppRouter


// programmatically load any route
export function gotoRoute(pathname){
	AppRouter.gotoRoute(pathname)
}


export function anchorRoute(e) {
	e.preventDefault();
	const closestAnchor = e.target.closest('a');
	if (closestAnchor) {
	  const pathname = closestAnchor.pathname;
	  AppRouter.gotoRoute(pathname);
	} else {
	  console.error('No anchor element found in event target hierarchy.');
	}
  }
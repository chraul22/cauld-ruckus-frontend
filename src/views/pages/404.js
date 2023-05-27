import App from './../../App'
import {html, render } from 'lit-html'

class FourOFourView{
  init(){
    console.log('FourOFourView.init')    
    document.title = '404 File not found'    
    setTimeout(() => {
    this.render()
  }, 3000) 

  }

  render(){
    const template = html`
    
    <body>   
        <div class="lalign page-content">
    
        <h1>Oh you fool, you idiot, you utter pillock you came to a nonexistent page</h1>
        <h2>Here is a toasted cheese sandwich recipe for your trouble:</h2>
      
      <h2>Ingredients:</h2>
        <ul>
          <li>2 slices of bread</li>
          <li>1 slices of whatever cheese</li>
          <li>butter</li>
        </ul>
        <h2>Instructions:</h2>
        <ol>
          <li>Heat a pan or equivalent hot thing over medium heat.</li>
          <li>Butter one side of each slice of bread.</li>
          <li>Place one slice of cheese on the unbuttered side of the bread</li>
          <li>Put the other piece of bread on top, butter side up</li>
          <li>Place the sandwich on the hot thing until the bottom is golden brown and the cheese is melted</li>
          <li>Turn the sandwich upside down. But whose to say it wasn't already upside down? Makes you think... cook until the other side is golden brown and the cheese is fully melted</li>
          <li>Don't bite directly into it you'll burn your mouth, especially since it's still in the pan </li>
          <li>Remove from pan and put into face</li>
        </ol>
         </div>
         </body>
    `
    render(template, App.rootEl)
  }
}

export default new FourOFourView()
import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class ArticleAPI {

   async getArticles(){
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

      // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting article')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

  async submitArticles(articleData = 'form') {
    try {
        const response = await fetch(`${App.apiBase}`, {
        method: 'POST',
        headers: {
           'Authorization': `Bearer ${localStorage.accessToken}`
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        const createdArticle = await response.json();
        console.log('Article created:', createdArticle);
        Toast.show('Article submitted successfully!');
        return createdArticle;
      } else {
        throw new Error('Failed to submit article');
      }
    } catch (err) {
      console.error('Error creating article:', err);
      Toast.show('Failed to submit article!', 'error');
      throw err;
    }
  }

  async updateArticle(articleId, data, dataType = 'json') {
    try {
      let responseHeader;
  
      if (dataType === 'form') {
        responseHeader = {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.accessToken}`,
          },
          body: data,
        };
      } else if (dataType === 'json') {
        responseHeader = {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
      }
  
      const response = await fetch(`${App.apiBase}/articles/${articleId}`, responseHeader);
  
      if (response.ok) {
        const updatedArticle = await response.json();
        console.log('Article updated:', updatedArticle);
        Toast.show('Article updated successfully!');
        return updatedArticle;
      } else {
        throw new Error('Failed to update article');
      }
    } catch (err) {
      console.error('Error updating article:', err);
      Toast.show('Failed to update article!', 'error');
      throw err;
    }
  }
  
}

export default new ArticleAPI()

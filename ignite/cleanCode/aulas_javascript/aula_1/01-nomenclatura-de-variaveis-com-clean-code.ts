// Nomenclatura de variáveis

const userCategoriesRank = [
    {
      title: 'User',
      followers: 5
    },
    {
      title: 'Friendly',
      followers: 50,
    },
    {
      title: 'Famous',
      followers: 500,
    },
    {
      title: 'Super Star',
      followers: 1000,
    },
  ]
  
  export default async function getUserData(req, res) {
    const username = String(req.query.username)
  
    if (!username) {
      return res.status(400).json({
        message: `Please provide an username to search on the github API`
      })
    }
  
    const userDataResponse = await fetch(`https://api.github.com/users/${username}`);
  
    if (userDataResponse.status === 404) {
      return res.status(400).json({
        message: `User with username "${username}" not found`
      })
    }
  
    const userData = await userDataResponse.json()
  
    const orderedUserCategoriesRank = userCategoriesRank.sort((a, b) =>  b.followers - a.followers); 
  
    const userCategory = orderedUserCategoriesRank.find(userCategoryItem => userData.followers > userCategoryItem.followers)
  
    const userResult = {
      username: username,
      category: userCategory?.title
    }
  
    return userResult
  }
  
  getUserData({ query: {
    username: 'josepholiveira'
  }}, {})
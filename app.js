
/**
 * validate user input
 * get users data
 * compare user followers
 */



//Selectors
const content=document.querySelector(".content")
const firstUserInput=document.getElementById("user-input1")
const secondUserInput=document.getElementById("user-input2")
const startBtn=document.getElementById("start-btn")
const resetBtn=document.getElementById("reset-btn")



//Constants
const api_url_users="https://api.github.com/users/"
const api_url_search="https://api.github.com/search/repositories?q="



startBtn.addEventListener("click",()=>{
  showResult()
  
})


async function showResult(){

  if(validateUserInput(firstUserInput.value)&&validateUserInput(secondUserInput.value)){
  await  compareUser(firstUserInput.value,secondUserInput.value)
  document.body.addEventListener("click",(event)=>{

    if(event.target.id=="reset-btn"){
      const target=event.target.id
      console.log("------------------"+target)
        document.querySelector(".content-wrraper").innerHTML=`
        <div class="content">
                <h2><span>p</span>layers</h2>
                <div class="player-input-section">
                  <!-- Player Input 1 -->
                  <div class="player-input">
                    <h4>player one</h4>
                    <input
                      id="user-input1"
                      type="text"
                      placeholder="Enter first player name"
                    />
                  </div>
                  <!-- Player Input 2 -->
                  <div class="player-input">
                    <h4>player two</h4>
                    <input
                      id="user-input2"
                      type="text"
                      placeholder="Enter second player name"
                    />
                  </div>
                </div>
                <button id="start-btn">start battle</button>
              </div>`
      }
    }
  )  
  }else{
    alert("Input field should not be empty!")
  }
  
}

/**
 * check if the user input is empty or not, return true if is valid, else return false
 * @param  userInput - user input that will be validate
 * @returns a boolean value
 */
function validateUserInput(userInput){
    return userInput.trim().length!==0
}



async function compareUser(firstUser,secondUser){

  let user1= await getUserData(firstUser)
  let user2=await getUserData(secondUser)

  displayData(user1,user2)
  
  if((user1.stargazers_count>user2.stargazers_count)&&(user1.forks_count>user2.forks_count)){
    document.getElementById("user1").classList.add("winner")
  }else{
    document.getElementById("user2").classList.add("winner")
  }

}



async function getUserData(userName){
    
    
    // let response=await fetch(api_url_users+userName);
    // let jsonData=await response.json();
    // let userData={
    //   name:jsonData.name,
    //   avatar_url:jsonData.avatar_url,
    //   bio:jsonData.bio,
    //   followers:jsonData.followers,
    //   following:jsonData.following,
    //   repos:jsonData.public_repos

    // }

    let response=await fetch(api_url_search+userName);
    let jsonData=await response.json();
    console.log(jsonData.items[0])
    let userData={
      name:jsonData.items[0].name,
      avatar_url:jsonData.items[0].owner.avatar_url,
      bio:jsonData.items[0].description,
      stargazers_count:jsonData.items[0].stargazers_count,
      forks_count:jsonData.items[0].forks_count,
      open_issues_count:jsonData.items[0].open_issues_count

    }

    


return userData

}
function displayData(user1,user2){


   let content=`
    <div class="result-container">

    <div class=user-card-result-container>
        <div id ="user1" class="user-card ">
          <!-- profile image -->
          <img class="user-img" src="${user1.avatar_url}" alt="" />

          <!-- user profile name -->
          <h2 class="user-name">${user1.name}</h2>
          <!-- user bio -->
          <p class="user-bio">${user1.bio == null ? "--" : user1.bio}</p>

          <div class="account-information">
            <!-- card info 1 -->
            <div class="card-info">
              <!-- info title -->
              <h5>open issues</h5>
              <!-- info detail -->
              <p id="repo-info">${user1.open_issues_count}</p>
            </div>
            <!-- card info 2 -->
            <div class="card-info">
              <!-- info title -->
              <h5>forks count</h5>
              <!-- info detail -->
              <p id="forks_count-info">${user1.forks_count}</p>
            </div>
            <!-- card info 3 -->
            <div class="card-info">
              <!-- info title -->
              <h5>stargazers count</h5>
              <!-- info detail -->
              <p id="stargazers_count-info">${user1.stargazers_count}</p>
            </div>
          </div>
        </div>
        <div id="user2" class="user-card">
          <!-- profile image -->
          <img class="user-img" src="${user2.avatar_url}" alt="" />

          <!-- user profile name -->
          <h2 class="user-name">${user2.name}</h2>
          <!-- user bio -->
          <p class="user-bio">${user2.bio == null ? "--" : user2.bio}</p>

          <div class="account-information">
            <!-- card info 1 -->
            <div class="card-info">
              <!-- info title -->
              <h5>open issues</h5>
              <!-- info detail -->
              <p id="repo-info">${user2.open_issues_count}</p>
            </div>
            <!-- card info 2 -->
            <div class="card-info">
              <!-- info title -->
              <h5>forks count</h5>
              <!-- info detail -->
              <p id="forks_count-info">${user2.forks_count}</p>
            </div>
            <!-- card info 3 -->
            <div class="card-info">
              <!-- info title -->
              <h5>stargazers count</h5>
              <!-- info detail -->
              <p id="stargazers_count-info">${user2.stargazers_count}</p>
            </div>
          </div>
        </div>
        </div>
        <button id="reset-btn">reset</button>
      </div>
      `
    document.querySelector(".content-wrraper").innerHTML=content;
}
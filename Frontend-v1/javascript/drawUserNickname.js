const userData = JSON.parse(localStorage.getItem("userData"));
console.log('Logged user nickname: ' + userData.nickname + ' id: ' + userData.user_id)

document.getElementById("username").textContent = '@' + userData.nickname;
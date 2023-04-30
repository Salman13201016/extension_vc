function getUserId() {
	let id;
	try {
		id = document.getElementById("lblLoginUser").innerText;
	}
	catch(err) {
		id = null;
	}
	return id;
}
function getUserName() {
	return Setting.give('profile').name;
}
function getUserTel() {
	return Setting.give('profile').tel;
}
function getUserTeam() {
	return Setting.give('profile').team;
}
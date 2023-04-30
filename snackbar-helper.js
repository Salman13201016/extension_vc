function showSnackbar(msg, time) {
	let panel = document.getElementById('mysnackbar');
	panel.className = 'show';
	panel.innerHTML = msg;
	setTimeout(() => {
		hideSnackbar();
	}, time);
}
function hideSnackbar() {
	$('#mysnackbar').removeClass('show');
}
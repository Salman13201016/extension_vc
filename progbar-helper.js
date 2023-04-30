function showProgBar(data) {
	$('#myprogressbar').show();
	if (!!data.msg) $('#myprogresstext').text(data.msg);
	let diffper = (data.current / data.total) * 100;
	$('#mybarText').text(parseInt(diffper) + ' %');
	$('#mybar').css({'width':diffper+'%'});
}
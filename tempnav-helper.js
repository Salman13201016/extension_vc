function tempnavPrev(group) {
	let ci = parseInt($('#' + group + 'cidx').text());
	ci--;
	if (ci < 1) ci = Setting.give('general').maxreminderstage;
	$('#' + group + 'cidx').text(ci);
	$('#' + group + 'groupa').val(Setting.give('template')[group].main[ci - 1].a);
	$('#' + group + 'groupb').val(Setting.give('template')[group].main[ci - 1].b);
	$('#' + group + 'groupc').val(Setting.give('template')[group].main[ci - 1].c);
}
function tempnavNext(group) {
	let ci = parseInt($('#' + group + 'cidx').text());
	ci++;
	if (ci > Setting.give('general').maxreminderstage) ci = 1;
	$('#' + group + 'cidx').text(ci);
	$('#' + group + 'groupa').val(Setting.give('template')[group].main[ci - 1].a);
	$('#' + group + 'groupb').val(Setting.give('template')[group].main[ci - 1].b);
	$('#' + group + 'groupc').val(Setting.give('template')[group].main[ci - 1].c);
}
function listOfMonths() {
	return ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
}
function getTarikhMonthId() {
	return new Date().getMonth();
}
function getTarikhMonthName() {
	return listOfMonths()[getTarikhMonthId()];
}
function getTarikhYear() {
	return new Date().getFullYear();
}
function getTarikhShortYearStr() {
	return getTarikhYear().toString().slice(2,4);
}
function getTarikhShortYearInt() {
	return parseInt(getTarikhShortYearStr());
}
function getTarikhShortYearSum() {
	return getTarikhShortYearStr().split('').reduce((a,b) => a + parseInt(b), 0);
}
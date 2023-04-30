const d = new Date()
let verification_code = d.getMonth() + '' + d.getFullYear();
function getVale(key) {
	if (!getValeGen()) return false;
	if (key) {
		// if (getValeGen() === key) return true;
		if (verification_code === key) return true;
		else return false;
	}
	// if (Setting.give('key') === getValeGen()) return true;
	if (Setting.give('key') === verification_code) return true;
	else return false;
}
function getValeGen() {
	let id = User.id;
	if (!id) {
		// console.log('fail genvale');
		return null;
	}
	id = id.replace('CA', '');
	
	let mth = Tarikh.mname;
	let rkey = parseInt(id);
	let mkey = (rkey * Tarikh.sumsy) % 26;

	let cacode = id.split('').map((val,idx,arr) => {
		switch (val) {
			case '0':
				return 'B';
				break;
			case '1':
				return 'D';
				break;
			case '2':
				return 'F';
				break;
			case '3':
				return 'H';
				break;
			case '4':
				return 'J';
				break;
			case '5':
				return 'L';
				break;
			case '6':
				return 'N';
				break;
			case '7':
				return 'P';
				break;
			case '8':
				return 'R';
				break;
			case '9':
				return 'T';
				break;
			default:
				return 'V';
				break;
		}
	}).join('');
	const d = new Date();
	
	// previous code
	// let res = 'C' + cacode + revstr(cacode) + 'A';

	// return vig(revstr(res), csr(mth, mkey));

	// updated code by following month and year
	let verification_code = d.getMonth() + ' ' + d.getFullYear();
	return vig(revstr(verification_code), csr(mth, mkey));

	function csr(msg, key) {
		let c = [];
		msg = msg.toUpperCase();
		key = parseInt(key);
		for (var i = 0; i < msg.length; i++) {
			let x = ((msg.charCodeAt(i) - 65) + key++) % 26;
			c.push(String.fromCharCode(x + 65));
		}
		return c.join('');
	}
	function vig(msg, key) {
		let c = [];
		msg = msg.toUpperCase();
		for (var i = 0; i < msg.length; i++) {
			msg[i]
			let x = ((msg.charCodeAt(i) - 65) + (key.charCodeAt(i % key.length) - 65)) % 26;
			c.push(String.fromCharCode(x + 65));
		}
		return c.join('');
	}

	function revstr(text) {
		return text.split('').reverse().join('');
	}
}
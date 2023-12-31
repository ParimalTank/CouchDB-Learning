import crypto from "crypto";

export function timeAgo(input) {
	const date = input instanceof Date ? input : new Date(input);
	const formatter = new Intl.RelativeTimeFormat("en");
	const ranges = {
		years: 3600 * 24 * 365,
		months: 3600 * 24 * 30,
		weeks: 3600 * 24 * 7,
		days: 3600 * 24,
		hours: 3600,
		minutes: 60,
		seconds: 1,
	};
	const secondsElapsed = (date.getTime() - Date.now()) / 1000;
	for (const key in ranges) {
		if (ranges[key] < Math.abs(secondsElapsed)) {
			const delta = secondsElapsed / ranges[key];
			return formatter.format(Math.round(delta), key);
		}
	}
}
export function validateUsername(value) {
	return value.match(/^[a-z]+(?:_+[a-z]+)*$/);
}
export function validateEmail(email) {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	);
}
export function validatePassword(password) {
	return password.match(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
	);
}
// in case of any particular use-case

export function validatePrice(price) {
	return price.match(/^(\d+(?:[\.\,]\d{2})?)$/);
}

export function hasEightDigit(text) {
	return text.length >= 8;
}
export function hasNumber(text) {
	return text.match(/[0-9]/);
}
export function hasUpperCase(text) {
	return text.match(/[A-Z]/);
}
export function hasSpecialCharacter(text) {
	return text.match(/\W/);
}
export function hasWhiteSpace(text) {
	return text.match(/\s/g);
}
export function checkPassword(text) {
	const isLength = hasEightDigit(text);
	const isNumber = hasNumber(text);
	const isUpperCase = hasUpperCase(text);
	const isSpecialCharacter = hasSpecialCharacter(text);
	const isWhiteSpace = hasWhiteSpace(text);

	let temp = {};
	if (
		isLength &&
		isNumber &&
		isUpperCase &&
		isSpecialCharacter &&
		!isWhiteSpace
	) {
		temp = { validate: true };
	} else {
		for (let i = 0; i < 5; i++) {
			temp = {
				validate: false,
				message: `Password must ${
					!isLength || !isNumber || !isUpperCase || !isSpecialCharacter
						? "include"
						: "not have"
				} ${isLength ? "" : "8 characters"}${
					!isLength && !isNumber ? ", " : ""
				} ${isNumber ? "" : "one digit"}${
					!isNumber && !isUpperCase ? ", " : ""
				}${isUpperCase ? "" : "one uppercase character"} 
				${!isUpperCase && !isSpecialCharacter ? ", " : ""}
				${isSpecialCharacter ? "" : "one special character"}
				${!isSpecialCharacter && isWhiteSpace ? ", " : ""}
				${
					!isWhiteSpace
						? ""
						: isLength && isNumber && isUpperCase && isSpecialCharacter
						? "whitespace"
						: "and exclude whitespace"
				}.`,
			};
		}
	}

	return temp;
}
export function validateName(value) {
	return value.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/);
}

export function userValidation(user) {
	const temp = {};
	const tempObj = {
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		password: "",
		profile: "",
	};
	Object.keys(tempObj).map((each) => {
		if (!user.hasOwnProperty(each)) {
			temp[each] = `${each} is required.`;
		}
	});

	if (Object.keys(temp).length === 0) {
		return { validate: true };
	} else {
		return { validate: false, message: temp };
	}
}

export function userSchemaValidate(userData) {
	const temp = { extraFields: [], count: 0 };
	const user = {
		doc_type: "",
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		profile: "",
		account_type: "",
		createdAt: "",
		updatedAt: "",
	};
	Object.keys(userData).map((each) => {
		if (!user.hasOwnProperty(each)) {
			temp.extraFields = [...temp.extraFields, each];
			temp.count = temp.count + 1;
		}
	});

	return temp;
}

export function productSchemaValidate(productData) {
	const temp = { extraFields: [], count: 0 };
	const product = {
		doc_type: "",
		name: "",
		category: "",
		price: "",
		description: "",
		images: [],
		available_products: "",
		status: "",
		createdAt: "",
		updatedAt: "",
		userId: "",
	};
	Object.keys(productData).map((each) => {
		if (!product.hasOwnProperty(each)) {
			temp.extraFields = [...temp.extraFields, each];
			temp.count = temp.count + 1;
		}
	});

	return temp;
}

function getFixedKey() {
	return "asddasddasddasddasddasddasddasdd";
}

export function enc_data(data) {
	const iv = getFixedKey().slice(0, 16);
	const encrypted = crypto.createCipheriv("aes-256-ctr", getFixedKey(), iv);
	return encrypted.update(data, "utf8", "base64") + encrypted.final("base64");
}

export function dec_data(data) {
	const iv = getFixedKey().slice(0, 16);
	const decrypted = crypto.createDecipheriv("aes-256-ctr", getFixedKey(), iv);
	return decrypted.update(data, "base64", "utf8") + decrypted.final("utf8");
}

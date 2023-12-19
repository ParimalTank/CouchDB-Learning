export class UserSchema {
	create(data) {
		const error = {};
		const temp = {
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
		Object.keys(temp).map((each) => {
			if (!data.hasOwnProperty(each)) {
				error[each] = `${each} is not in user schema.`;
			}
		});
	}
}

export class productSchema {
	create(data) {
		const error = {};
		const testObj = {
			name: "",
			category: "",
			price: 0,
			description: "",
			product_image: [],
			userId: "",
			available_products: 0,
			status: "",
			createdAt: "",
			updatedAt: "",
		};
		Object.keys(testObj).forEach((each) => {
			if (!data.hasOwnProperty(each)) {
				error[each] = `${each} is not in product schema.`;
			}
		});
		return error;
	}

	update(data) {
		const error = {};
		const testObj = {
			_id: "",
			_rev: "",
			name: "",
			category: "",
			price: 0,
			description: "",
			product_image: [],
			userId: "",
			available_products: 0,
			status: "",
			createdAt: "",
			updatedAt: "",
		};
		Object.keys(data).map((each) => {
			if (!testObj.hasOwnProperty(each)) {
				error.each = `${each}is not in product schema.`;
			}
		});
		return error;
	}
}

export function checkUserSchema(data) {
	const error = {};
	const temp = {
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		profile: "",
		account_type: "",
		propId: "",
		security: "",
		createdAt: "",
		updatedAt: "",
	};
	Object.keys(temp).map((each) => {
		if (!data.hasOwnProperty(each)) {
			error[each] = `${each} is required.`;
		} else if (typeof data[each] === "undefined") {
			error[each] = `${each} is not valid`;
		}
	});
	return error;
}

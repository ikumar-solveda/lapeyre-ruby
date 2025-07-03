export const fetchFromAPI = async () => {
	const res = await fetch('https://www.statics-lapeyre.fr/json/home.json');
	const data = await res.json();
	console.log('inUtilsData', data);
	return data;
};

export const isValidDate = (item: Record<any, any>): boolean => {
	const sDateStart = item?.dateStart;
	const sDateEnd = item?.dateEnd;
	if (sDateStart || sDateEnd) {
		const dateStart = Date.parse(sDateStart);
		const dateEnd = Date.parse(sDateEnd);
		const now = Date.now();
		if (dateStart && !dateEnd) {
			return now >= dateStart;
		} else if (!dateStart && dateEnd) {
			return now <= dateEnd;
		} else if (dateStart && dateEnd) {
			return now >= dateStart && now <= dateEnd;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

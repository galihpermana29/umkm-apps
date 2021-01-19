function getThisEl(thisElement, quantityEl) {
	let imgClickName = thisElement.children[0].getAttribute('src');
	const itemClickName = thisElement.children[1].children[0].textContent;
	const priceClickName = thisElement.children[1].children[1].textContent;
	let quantityCart = 0;

	if (thisElement.className === 'cardItems') {
		quantityCart = 0;
		imgClickName = thisElement.children[0].getAttribute('src');
	} else {
		if (thisElement.className === 'cartItem') {
			quantityCart = quantityEl.children[1].children[1].value;
		} else {
			quantityCart = quantityEl.children[0].children[1].value;
		}
		imgClickName = thisElement.children[0].children[0].getAttribute('src');
	}

	let item = {
		itemName: itemClickName,
		itemPrice: priceClickName,
		itemImg: imgClickName,
		itemQuantity: quantityCart,
	};

	return item;
}

export { getThisEl };

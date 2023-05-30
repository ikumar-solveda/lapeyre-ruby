/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

const receiver = <V>(value: V) => {
	const returnMethod = <Y>(method: (value: V) => Y) => receiver(method(value));
	returnMethod.value = () => value;
	return returnMethod;
};

/**
 * Chain receives starting value, accepts unlimited
 * functions. Call the value method at the end to return value.
 *
 * @example chain(4)(x => x*2).value() = 8
 */
export const chain = <V>(value: V) => receiver(value);

/**
 * Chain logger can be placed anywhere in the chain to
 * console log current value without breaking the chain.
 *
 * @example chain(4)(x => x*2)(chain.log).value() = 8
 */
chain.log = <S>(state: S): S => {
	console.log(state);
	return state;
};

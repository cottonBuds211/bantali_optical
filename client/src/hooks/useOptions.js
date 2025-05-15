import { useCallback } from 'react'

const generateOptions = limit => {
	const increment = 0.25
	const options = [{ value: '0.00', label: '0.00' }]
	for (let i = increment; i <= limit; i += increment) {
		options.push(
			{ value: i.toFixed(2), label: `+${i.toFixed(2)}` },
			{ value: (-i).toFixed(2), label: `${(-i).toFixed(2)}` }
		)
	}
	return options
}

const generateVisAcOptions = () => {
	const increment = 10
	const options = []
	for (let i = 20; i <= 120; i += increment) {
		options.push({ value: `20/${i}`, label: `20/${i}` })
	}
	return options
}

const useOptions = () => {
	const sphereOptions = generateOptions(6)
	const cylinderOptions = generateOptions(6)
	const axisOptions = Array.from({ length: 181 }, (_, i) => ({
		value: i.toString(),
		label: i.toString(),
	}))
	const visualAcuityOption = generateVisAcOptions()

	// Simplified addOptions generation
	const addOptions = generateOptions(4).filter(o => parseFloat(o.value) >= 0)

	const memoizedOptions = useCallback(
		() => ({
			sphereOptions,
			cylinderOptions,
			axisOptions,
			visualAcuityOption,
			addOptions,
		}),
		[]
	)

	return memoizedOptions
}

export default useOptions

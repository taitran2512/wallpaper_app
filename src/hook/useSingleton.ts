import { useState } from 'react'

export const useSingleton = (callBack = () => {}) => {
	const [hasBeenCalled, setHasBeenCalled] = useState<boolean>(false)
	if (hasBeenCalled) {
		return
	}
	callBack()
	setHasBeenCalled(true)
}

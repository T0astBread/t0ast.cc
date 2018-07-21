export const getParentOfResource = url => {
	const urlSegments = url.split("/")
	return urlSegments.slice(0, urlSegments.length - 1).join("/")
}

export const getResourceName = url => {
	const urlSegments = url.split("/")
	return urlSegments[urlSegments.length - 1]
}

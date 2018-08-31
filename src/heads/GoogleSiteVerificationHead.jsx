import React from 'react'
import {Head} from 'react-static'

const GoogleSiteVerificationHead = () => {
	const verificationCodeString = process.env.GOOGLE_SITE_VERIFICATION
	if(!verificationCodeString) return
	const verificationCodes = verificationCodeString.split(",").map(code => code.trim())
	return (
		<Head>
			{verificationCodes.map(verificationCode => (
				<meta name="google-site-verification" content={verificationCode} key={verificationCode} />
			))}
		</Head>
	)
}

export default GoogleSiteVerificationHead
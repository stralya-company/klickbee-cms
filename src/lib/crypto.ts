'use server'

import CryptoJS from 'crypto-js'

const SECRET_KEY = process.env.ADMIN_GENERATED_KEY || 'ma-cle-secrete'

export async function encryptString(text: string) {
	const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY).toString()
	return encrypted
}

export async function decryptString(encryptedText: string) {
	const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY)
	const decrypted = bytes.toString(CryptoJS.enc.Utf8)
	return decrypted
}

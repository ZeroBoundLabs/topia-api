import fs from 'fs'
import { promisify } from 'util'
const writeFile = promisify(fs.writeFile)

const USERS_UPLOAD_DIR = 'uploads/users'
const ORGANISATIONS_UPLOAD_DIR = 'uploads/organisations'

export const uploadFile = async (filename, data, type) => {
  let path
  if (type === 'user_avatar' || type === 'user_banner') {
    path = `${USERS_UPLOAD_DIR}/${filename}`
  }

  if (type === 'organisation_logo' || type === 'organisation_banner') {
    path = `${ORGANISATIONS_UPLOAD_DIR}/${filename}`
  }

  await writeFile(`./${path}`, data)

  return path
}

import fs from 'fs'
import { promisify } from 'util'
const writeFile = promisify(fs.writeFile)

const USERS_UPLOAD_DIR = 'uploads/users'

export const uploadFile = async (filename, data, type) => {
  let path
  if (type === 'user_avatar') {
    path = `${USERS_UPLOAD_DIR}/${filename}`
  }
  await writeFile(`./${path}`, data)

  return path
}

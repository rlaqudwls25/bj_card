export const validate = {
  isEmail: (email: string) => {
    const emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    return emailReg.test(email)
  },
  isPassword: (password: string) => {
    const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    return passwordReg.test(password)
  },
}

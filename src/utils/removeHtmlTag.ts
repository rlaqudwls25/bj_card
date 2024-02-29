export const removeHtmlTag = (str: string) => {
  // < 문자로 시작
  // [^>] >를 제외한 모든 문자
  // * 0번 이상 반복
  // > 문자로 끝
  return str.replace(/<[^>]*>/g, '')
}

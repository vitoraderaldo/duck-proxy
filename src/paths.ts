export class Paths {
  static homePage() {
    return '/'
  }

  static searchPage(params: {
    query: string,
    page: number,
    locale: string,
  }) {
    const page = params.page || 1;
    const locale = params.locale || 'en-US'
    return `/search?query=${params.query}&page=${page}&locale=${locale}`
  }
}

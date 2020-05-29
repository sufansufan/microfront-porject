import RouterStatic from './scripts/routerStatic'
import Store from './store/'

/* eslint-disable */
export default myRuntimePublicPath => {
  __webpack_public_path__ = myRuntimePublicPath
  return {
    routerStatic: RouterStatic,
    store: Store
  }
}

import Router from './scripts/router'
import RouterStatic from './scripts/routerStatic'
import projectManage from './store'

/* eslint-disable */
export default myRuntimePublicPath => {
    __webpack_public_path__ = myRuntimePublicPath
    return {
        router: Router,
        routerStatic: RouterStatic,
        store: {
            projectManage
        }
    }
}

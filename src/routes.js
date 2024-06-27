
import ProductsGallery from "./Views/ProductsGallery"
import Sneakers from "./Views/Sneakers"


const routes = [
    {
        path: '/home',
        Element: ProductsGallery

    },
    {
        path: '/zapatillas',
        Element: Sneakers
    },
    {
        path: '/sudaderas',
        Element: ""
    }

]
export default routes  
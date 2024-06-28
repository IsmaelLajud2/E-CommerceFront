
import CamisetasGallery from "./Views/CamisetasGallery"
import ProductsGallery from "./Views/ProductsGallery"
import Sneakers from "./Views/Sneakers"
import Sudaderas from "./Views/Sudaderas"


const routes = [
    {
        path: '/',
        Element: ProductsGallery

    },
    {
        path: '/zapatillas',
        Element: Sneakers
    },
    {
        path: '/camisetas',
        Element: CamisetasGallery

    },
    {
        path: '/sudaderas',
        Element: Sudaderas
    }

]
export default routes  
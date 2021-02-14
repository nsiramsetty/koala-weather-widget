import Weather from "../views/public/routes/weather/weather";
import NotFound from "../views/public/routes/404/404";

const publicRoutes = [{
    path: "/",
    name: "wather",
    component: Weather
}, {
    path: "/*",
    name: "not-found",
    component: NotFound
}];

export default publicRoutes;

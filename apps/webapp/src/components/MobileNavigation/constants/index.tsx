import { Home, Shapes, Wallet } from "lucide-react";
import { ROUTES } from "routes/paths";

export const mobileNavigationNavigation = [
	{
		to: ROUTES.HOME,
		title: "navigation.home",
		icon: <Home />,
	},
	{
		to: ROUTES.PORTFOLIOS.PORTFOLIOS,
		title: "navigation.portfolios",
		icon: <Wallet />,
	},
	{
		to: ROUTES.HUB,
		title: "navigation.hub",
		icon: <Shapes />,
	},
];

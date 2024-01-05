import { ErrorContent } from "components/ErrorContent";
import { MobileNavigation } from "components/MobileNavigation";
import { Sidebar } from "components/Sidebar";
import { Topbar } from "components/Topbar";
import { Fragment, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface TopbarSidebarProps {
	children: ReactNode;
}

export const TopbarSidebar = ({ children }: TopbarSidebarProps) => (
	<Fragment>
		<Topbar />

		<Sidebar />

		<MobileNavigation />

		<main className="mb-[50px] mt-[61px] p-4 lg:mb-0 lg:ml-[255px] lg:mt-[73px]">
			<ErrorBoundary FallbackComponent={ErrorContent}>{children}</ErrorBoundary>
		</main>
	</Fragment>
);

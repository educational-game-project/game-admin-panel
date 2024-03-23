import { createContext, useEffect, useState, ReactNode } from "react";

type ResponsiveProviderProps = {
	children: ReactNode;
};
export const ResponsiveContext = createContext<boolean | undefined>(undefined);

export const ResponsiveProvider = ({ children }: ResponsiveProviderProps) => {
	const [isDesktopView, setIsDesktopView] = useState<boolean>(
		window.innerWidth > 768
	);

	const handleResize = () => {
		setIsDesktopView(window.innerWidth > 768);
		document.body.style.overflow = "auto";
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<ResponsiveContext.Provider value={isDesktopView}>
			{children}
		</ResponsiveContext.Provider>
	);
};

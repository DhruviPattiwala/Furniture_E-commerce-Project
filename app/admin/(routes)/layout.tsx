"use client";

import LayoutWrapper from "../_components/layoutwrapper";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <LayoutWrapper>
            {children}
        </LayoutWrapper>

    );
}

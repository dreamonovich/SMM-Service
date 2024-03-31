import { Layout } from "./ui/layout";

export * from "./ui/layout";

export const generateLayout = (withSidebar: boolean = true) => {
    return () => <Layout withSidebar={withSidebar} />
}
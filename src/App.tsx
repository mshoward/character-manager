import { ComponentExample } from "@/components/component-example";
import Layout from "@/components/layout";
//import { Layout } from "@/components/layout";
import {ThemeProvider } from "@/components/theme-provider"

export function App() {
return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
            <ComponentExample />
        </Layout>
    </ThemeProvider>
    );
}

export default App;

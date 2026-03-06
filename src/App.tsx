import { ComponentExample } from "@/components/component-example";
import Layout from "@/components/layout";
//import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { SimpleBreadcrumbs } from "@/components/breadcrumbs-no-elipsis";
import { PathItemConstructor } from "@/types/PathMap";

function this_path() {
  return {
    previous: [],
    current: PathItemConstructor("/", "Home"),
  };
}

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <SimpleBreadcrumbs path_map={this_path()} />
        <ComponentExample />
      </Layout>
    </ThemeProvider>
  );
}

export default App;

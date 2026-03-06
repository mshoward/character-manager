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

export function Home() {
  return (
    <>
      <SimpleBreadcrumbs path_map={this_path()} />
      <ComponentExample />;
    </>
  );
}

export default Home;

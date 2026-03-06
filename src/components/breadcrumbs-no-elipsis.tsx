import { Outlet } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Link } from "react-router";
import type { PathMap, PathItem } from "@/types/PathMap";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  path_map: PathMap;
}

export function SimpleBreadcrumbs({ path_map }: Props) {
  const previous = path_map.previous;
  const current = path_map.current;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {previous.map((item) => (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={item.id}>{item.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>
            <Link to={current.id}>{current.name}</Link>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
export default SimpleBreadcrumbs;

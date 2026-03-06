import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowUpRightIcon, Folder } from "lucide-react";
import { SimpleBreadcrumbs } from "@/components/breadcrumbs-no-elipsis";
import { PathItemConstructor } from "@/types/PathMap";
import type { PathItem, PathMap } from "@/types/PathMap";

export function NewCharacter() {
  const prevs = [PathItemConstructor("/", "Home")];
  const curr = PathItemConstructor("new-characters", "New Character");
  const page_path = {
    previous: prevs,
    current: curr,
  };
  return (
    <>
      <SimpleBreadcrumbs path_map={page_path} />
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Folder />
          </EmptyMedia>
          <EmptyTitle>No Projects Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </EmptyContent>
        <Button
          variant="link"
          asChild
          className="text-muted-foreground"
          size="sm"
        >
          <a href="#">
            Learn More <ArrowUpRightIcon />
          </a>
        </Button>
      </Empty>
    </>
  );
}
export default NewCharacter;

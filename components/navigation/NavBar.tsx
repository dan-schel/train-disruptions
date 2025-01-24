import clsx from "clsx";
import React from "react";
import { usePageContext } from "vike-react/usePageContext";

import { Text } from "../core/Text";
import { Button } from "../core/Button";
import { PageCenterer } from "../common/PageCenterer";

/**
 * TODO: Determine when to conditional render the admin tab
 */

const Routes = [
  {
    name: "Overview",
    path: "/",
  },
  {
    name: "My commute",
    path: "/commute",
  },
  {
    name: "Admin",
    path: "/admin",
  },
];

export const NavBar = () => {
  const pageContext = usePageContext();

  return (
    <nav className="sticky bottom-0 order-last grid w-full border border-black bg-white lg:top-0 lg:order-first">
      <PageCenterer>
        <div className="flex items-center justify-center lg:justify-start lg:gap-10 lg:px-4 lg:py-2">
          {/* Branding- hidden on mobile */}
          <div className="grid items-center max-lg:hidden">
            <Text style="custom" className="text-3xl" oneLine>
              Is it buses?
            </Text>
          </div>

          {/* Tab buttons */}
          <div className="grid grid-flow-col grid-cols-4 items-center lg:flex lg:flex-grow lg:justify-between">
            <div className="col-span-3 grid grid-flow-col grid-cols-3 lg:flex lg:items-center">
              {Routes.map((route) => (
                <TabButton
                  key={route.name}
                  href={route.path}
                  label={route.name}
                  active={
                    route.path !== "/" &&
                    pageContext.urlPathname.startsWith(route.path)
                  }
                />
              ))}
            </div>
            <TabButton
              href="/settings"
              label="Settings"
              active={pageContext.urlPathname.startsWith("/settings")}
            />
          </div>
        </div>
      </PageCenterer>
    </nav>
  );
};

type TabProps = {
  label: string;
  href: string;
  active?: boolean;
};

const TabButton = (props: TabProps) => {
  return (
    <Button href={props.href}>
      <div
        className={clsx(
          "flex items-center gap-2 border-x border-black p-1 max-lg:flex-col lg:gap-4 lg:border lg:p-2",
          props.active && "bg-blue-100",
        )}
      >
        <div className="size-10 bg-black" />
        <Text style="custom" className="text-sm font-medium">
          {props.label}
        </Text>
      </div>
    </Button>
  );
};

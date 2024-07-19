"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 p-5", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/pages/complainpage">Complain</HoveredLink>
            <HoveredLink href="/pages/notificationpage">Notifications</HoveredLink>
            <HoveredLink href="/pages/driverrating">Bus Driver Rating</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Routes">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Bus Routes"
              href="/pages/routedisplay"
              src="/routes.png" // Correct path to reference the image in the public folder
              description="View detailed routes for all buses, including start and end points."
            />
              <ProductItem
              title="Accessbility for Disabilities"
              href="/pages/disablepeople"
              src="/accessibility.png" // Correct path to reference the image in the public folder
              description="We Provide Special Treatment for the Disabilities"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Emergency">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/pages/sosalertpage">SOS ALERT</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

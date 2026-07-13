import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales } from "./request";

/**
 * Navigation partagée entre Server et Client Components
 * avec locales supportées.
 */
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

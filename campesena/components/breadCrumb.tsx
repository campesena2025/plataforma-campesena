"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ChevronRightIcon = () => (
  <svg
    className="w-6 h-6 text-gray-400"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      fillRule="evenodd"
    />
  </svg>
);

const HomeIconSvg = () => (
  <svg
    className="w-4 h-4 mr-2"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const Breadcrumbs = ({ titulo }: { titulo: string }) => {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<
    { breadcrumb: string; href: string }[] | null
  >(null);

  const convertBreadcrumb = (stringPath: string) => {
    try {
      return decodeURIComponent(stringPath.replace(/-/g, " "));
    } catch (e) {
      return stringPath.replace(/-/g, " ");
    }
  };

  useEffect(() => {
    if (pathname) {
      const linkPath = pathname.split("/").filter((path) => path);
      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [pathname]);

  const renderBreadcrumbs = () => {
    if (!breadcrumbs) {
      return (
        <div className="h-6 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      );
    }

    return (
      <nav aria-label="Breadcrumb" className="flex">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              href="/"
            >
              <HomeIconSvg />
              Inicio
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb, index) => {
            if (breadcrumb.breadcrumb === "empresa") {
              return <li key={breadcrumb.href} aria-hidden="true" />;
            }

            const isLast = index === breadcrumbs.length - 1;
            let breadcrumbText = convertBreadcrumb(breadcrumb.breadcrumb);

            if (breadcrumb.breadcrumb.includes("%")) {
              breadcrumbText = "Datos empresa";
            }

            return (
              <li key={breadcrumb.href}>
                <div className="flex items-center">
                  <ChevronRightIcon />
                  {isLast ? (
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                      {breadcrumbText}
                    </span>
                  ) : (
                    <Link
                      className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                      href={breadcrumb.href}
                    >
                      {breadcrumbText}
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  };

  return (
    <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-1 lg:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              {titulo}
            </span>
          </div>
          <div className="flex-shrink-0">{renderBreadcrumbs()}</div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumbs;

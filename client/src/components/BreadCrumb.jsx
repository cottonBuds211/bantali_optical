import React, { Fragment } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";

//TODO : Fix Breadcrumb link for patients

function BreadCrumb({ setSelectedItem }) {
	const paths = useLocation();
	const pathNames = paths.pathname.split("/").filter((path) => path);
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link
							to={"/dashboard"}
							onClick={() => setIsSelected("Dashboard")}
						>
							Home
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />

				{pathNames.map((link, index) => {
					const href = `/${pathNames.slice(0, index + 1).join("/")}`;
					const linkName = link[0].toUpperCase() + link.slice(1);
					return (
						<Fragment key={index}>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link to={href}>{linkName}</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</Fragment>
					);
				})}
				<BreadcrumbItem></BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}

export default BreadCrumb;

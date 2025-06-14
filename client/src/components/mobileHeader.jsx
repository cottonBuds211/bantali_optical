import React from "react";

function mobileHeader({ sidebarOpen, setSidebarOpen }) {
	return (
		<div className="sticky top-0 bg-white border-b border-slate-200 z-30">
			<div className="px-4 sm:px-4 lg:px-8">
				<div className="flex items-center justify-between h-16 -md-px">
					{/* Header left side */}
					<div className="flex">
						<button
							className="text-slate-500 hover:text-slate-600 lg:hidden"
							aria-controls="sidebar"
							onClick={() => {
								setSidebarOpen(!sidebarOpen);
							}}
						>
							<svg
								width="15"
								height="15"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M14 12.85L1 12.85L1 14.15L14 14.15L14 12.85ZM14 8.85002L1 8.85002L1 10.15L14 10.15L14 8.85002ZM1 4.85003L14 4.85003L14 6.15003L1 6.15002L1 4.85003ZM14 0.850025L1 0.850025L1 2.15002L14 2.15002L14 0.850025Z"
									fill="currentColor"
									fill-rule="evenodd"
									clip-rule="evenodd"
								></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default mobileHeader;

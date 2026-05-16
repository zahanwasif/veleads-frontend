"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Footer() {
	const columns = [
		{
			title: "Product",
			links: [
				{ name: "Find & Enrich Leads", href: "product" },
				{ name: "Solutions", href: "solutions" },
				{ name: "Workflow Builder", href: "how-it-works" },
			],
		},
	];

	return (
		<footer className="bg-[#F9F9F7] border-t border-[#E5E5E5] pt-20 pb-8">
			<div className="max-w-[1200px] mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
					<motion.div
						initial={{
							opacity: 0,
							y: 20,
						}}
						whileInView={{
							opacity: 1,
							y: 0,
						}}
						viewport={{
							once: true,
						}}
						transition={{
							duration: 0.5,
						}}
						className="col-span-1"
					>
						<Image
							src="/logo.png"
							alt="VeLeads Logo"
							width={120}
							height={40}
							className="mb-4"
						/>
						<p className="text-[14px] text-[#6B6B6B] mb-8 leading-[1.6]">
							The multi-channel sales engagement platform for B2B teams
						</p>
					</motion.div>

					{columns.map((col, i) => (
						<motion.div
							key={i}
							initial={{
								opacity: 0,
								y: 20,
							}}
							whileInView={{
								opacity: 1,
								y: 0,
							}}
							viewport={{
								once: true,
							}}
							transition={{
								duration: 0.5,
								delay: (i + 1) * 0.15,
							}}
						>
							<h4 className="text-[11px] uppercase tracking-[0.2em] text-[#A0A0A0] mb-6 font-medium">
								{col.title}
							</h4>
							<ul className="space-y-4">
								{col.links.map((link, j) => (
									<li key={j}>
										<a
											href={`#${link.href}`}
											className="relative text-[14px] text-[#6B6B6B] hover:text-[#0F0F0F] transition-colors group inline-block"
										>
											{link.name}
											<span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#0F0F0F] transition-all duration-300 group-hover:w-full" />
										</a>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>

				<div className="border-t border-[#E5E5E5] pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-[13px] text-[#6B6B6B] mb-4 md:mb-0">
						© 2026 VeLeads. All rights reserved.
					</p>
					<p className="text-[13px] text-[#6B6B6B]">Made for B2B sales teams</p>
				</div>
			</div>
		</footer>
	);
}

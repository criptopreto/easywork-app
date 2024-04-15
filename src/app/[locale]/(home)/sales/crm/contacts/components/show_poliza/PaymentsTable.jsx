'use client';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';
import { useOrderByColumn } from '@/hooks/useOrderByColumn';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PolizasEmpty from '../show_contact/tab_polizas/PolizasEmpty';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

const people = [
	{
		receipt: '00017892',
		status: 'Liquidado',
		method: 'Anual',
		dateStart: '10/10/2024',
		dateEnd: '10/10/2026',
		amount: '3,456.90',
		coin: 'Pesos',
		attach: 'archivo.doc'
	},
	{
		receipt: '10017892',
		status: 'Cancelado',
		method: 'Semestral',
		dateStart: '10/10/2024',
		dateEnd: '10/10/2026',
		amount: '3,456.90',
		coin: 'Pesos',
		attach: 'archivo.doc'
	}
	// More people...
];

export default function PaymentsTable({ payments: data, base, noPolicy }) {
	const { t } = useTranslation();
	const { fieldClicked, handleSorting, orderItems } = useOrderByColumn({}, people);
	const [ payments, setPayments ] = useState(people);
	const pathname = usePathname();

	useEffect(
		() => {
			setPayments(orderItems);
		},
		[ orderItems ]
	);

	if (!payments || payments.length === 0) {
		return <PolizasEmpty add />;
	}

	return (
		<div className="h-full relative">
			<div className="relative overflow-x-auto shadow-md rounded-xl">
				<table className="min-w-full rounded-md bg-gray-100">
					<thead className="text-sm bg-white drop-shadow-sm uppercase">
						<tr className="">
							<th
								scope="col"
								className="py-3.5 pl-4 pr-3 text-center text-sm font-medium text-gray-400 cursor-pointer rounded-s-xl"
								onClick={() => {
									handleSorting('receipt');
								}}
							>
								<div className="group inline-flex items-center">
									{t('contacts:edit:policies:payments:table:receipt')}
									<span
										className={`invisible ml-2 flex-none rounded text-primary group-hover:visible group-focus:visible ${fieldClicked.field ===
											'receipt' && fieldClicked.sortDirection === 'desc'
											? 'transform rotate-180'
											: ''}`}
									>
										<ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
									</span>
								</div>
							</th>
							<th
								scope="col"
								className="px-3 py-3.5 text-center text-sm font-medium text-gray-400 cursor-pointer"
								onClick={() => {
									handleSorting('status');
								}}
							>
								<div className="group inline-flex items-center">
									{t('contacts:edit:policies:payments:table:status')}
									<span
										className={`invisible ml-2 flex-none rounded text-primary group-hover:visible group-focus:visible ${fieldClicked.field ===
											'status' && fieldClicked.sortDirection === 'desc'
											? 'transform rotate-180'
											: ''}`}
									>
										<ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
									</span>
								</div>
							</th>
							<th
								scope="col"
								className="px-3 py-3.5 text-center text-sm font-medium text-gray-400 cursor-pointer"
								onClick={() => {
									handleSorting('method');
								}}
							>
								<div className="group inline-flex items-center">
									{t('contacts:edit:policies:payments:table:method-payment')}
									<span
										className={`invisible ml-2 flex-none rounded text-primary group-hover:visible group-focus:visible ${fieldClicked.field ===
											'method' && fieldClicked.sortDirection === 'desc'
											? 'transform rotate-180'
											: ''}`}
									>
										<ChevronDownIcon
											className="invisible ml-2 h-6 w-6 flex-none rounded text-primary group-hover:visible group-focus:visible"
											aria-hidden="true"
										/>
									</span>
								</div>
							</th>
							<th
								scope="col"
								className="px-3 py-3.5 text-center text-sm font-medium text-gray-400 cursor-pointer"
								onClick={() => {
									handleSorting('dateStart');
								}}
							>
								<div className="group inline-flex items-center">
									{t('contacts:edit:policies:payments:table:validity')}
									<span
										className={`invisible ml-2 flex-none rounded text-primary group-hover:visible group-focus:visible ${fieldClicked.field ===
											'datStart' && fieldClicked.sortDirection === 'desc'
											? 'transform rotate-180'
											: ''}`}
									>
										<ChevronDownIcon
											className="invisible ml-2 h-6 w-6 flex-none rounded text-primary group-hover:visible group-focus:visible"
											aria-hidden="true"
										/>
									</span>
								</div>
							</th>
							<th
								scope="col"
								className="px-3 py-3.5 text-center text-sm font-medium text-gray-400 cursor-pointer"
								onClick={() => {
									handleSorting('expiration');
								}}
							>
								<div className="group inline-flex items-center">
									{t('contacts:edit:policies:payments:table:expiration')}
									<span
										className={`invisible ml-2 flex-none rounded text-primary group-hover:visible group-focus:visible ${fieldClicked.field ===
											'expiration' && fieldClicked.sortDirection === 'desc'
											? 'transform rotate-180'
											: ''}`}
									>
										<ChevronDownIcon
											className="invisible ml-2 h-6 w-6 flex-none rounded text-primary group-hover:visible group-focus:visible"
											aria-hidden="true"
										/>
									</span>
								</div>
							</th>
							<th
								scope="col"
								className="px-3 py-3.5 text-center text-sm font-medium text-gray-400 cursor-pointer"
								onClick={() => {
									handleSorting('amount');
								}}
							>
								<div className="group inline-flex items-center">
									{t('contacts:edit:policies:payments:table:amount')}
									<span
										className={`invisible ml-2 flex-none rounded text-primary group-hover:visible group-focus:visible ${fieldClicked.field ===
											'amount' && fieldClicked.sortDirection === 'desc'
											? 'transform rotate-180'
											: ''}`}
									>
										<ChevronDownIcon
											className="invisible ml-2 h-6 w-6 flex-none rounded text-primary group-hover:visible group-focus:visible"
											aria-hidden="true"
										/>
									</span>
								</div>
							</th>
							<th
								scope="col"
								className={`px-3 py-3.5 text-center text-sm font-medium text-gray-400 cursor-pointer ${base >
									0 && 'rounded-e-xl'}`}
								onClick={() => {
									handleSorting('coin');
								}}
							>
								<div className="group inline-flex items-center">
									{t('contacts:edit:policies:payments:table:coin')}
									<span
										className={`invisible ml-2 flex-none rounded text-primary group-hover:visible group-focus:visible ${fieldClicked.field ===
											'coin' && fieldClicked.sortDirection === 'desc'
											? 'transform rotate-180'
											: ''}`}
									>
										<ChevronDownIcon
											className="invisible ml-2 h-6 w-6 flex-none rounded text-primary group-hover:visible group-focus:visible"
											aria-hidden="true"
										/>
									</span>
								</div>
							</th>
							<th
								scope="col"
								className="px-3 py-3.5 text-center text-sm font-medium text-gray-400 cursor-pointer rounded-e-xl"
								onClick={() => {
									handleSorting('attach');
								}}
							>
								<div className="group inline-flex items-center">
									{t('contacts:edit:policies:payments:table:attach')}
									<span
										className={`invisible ml-2 flex-none rounded text-primary group-hover:visible group-focus:visible ${fieldClicked.field ===
											'attach' && fieldClicked.sortDirection === 'desc'
											? 'transform rotate-180'
											: ''}`}
									>
										<ChevronDownIcon
											className="invisible ml-2 h-6 w-6 flex-none rounded text-primary group-hover:visible group-focus:visible"
											aria-hidden="true"
										/>
									</span>
								</div>
							</th>
						</tr>
					</thead>
					<tbody className="bg-gray-100">
						{payments.map((poliza, index) => (
							<tr key={index}>
								<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-black sm:pl-0 text-center cursor-pointer hover:text-primary">
									<Link
										href={`/sales/crm/contacts/contact/policy/payments/consult/${poliza.receipt}?show=true`}
									>
										{poliza.receipt}
									</Link>
								</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400 uppercase text-center">
									{poliza.status}
								</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400 uppercase text-center">
									{poliza.method}
								</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400 uppercase text-center">
									{poliza.dateStart}
								</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400 text-center">
									{poliza.dateEnd}
								</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400 text-center">
									{`$ ${poliza.amount}`}
								</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400 text-center">
									{poliza.coin}
								</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400 text-center">
									<div className="flex gap-2 px-2 hover:text-primary">
										<DocumentTextIcon className="h-4 w-4 text-primary" aria-hidden="true" />
										{poliza.attach}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

'use client';
import { useCommon } from '../../hooks/useCommon';
import React from 'react';
import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import range from 'lodash/range';
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';

const InputDate = ({ label, value, onChange, icon, error, disabled, inactiveDate, border, time }) => {
	const  { t } = useTranslation();
	const { months } = useCommon();
	const years = range(1990, getYear(new Date()) + 1, 1);

	return (
	  <div className="flex flex-col gap-y-2 w-full">
		{label && <label className="text-sm font-medium text-gray-900">{label}</label>}
		<div className="w-full">
		  <DatePicker
			renderCustomHeader={({
			  date,
			  changeYear,
			  changeMonth,
			  decreaseMonth,
			  increaseMonth,
			  prevMonthButtonDisabled,
			  nextMonthButtonDisabled
			}) => {
			  return (
				<div
				  style={{
					margin: 0,
					display: 'flex',
					justifyContent: 'center'
				  }}
				>
				  <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
					<ChevronLeftIcon className='h-4 w-4 text-primary'/>
				  </button>
				  <select
					value={getYear(date)}
					onChange={({ target: { value } }) => {
					  return changeYear(value);
					}}
					className='h-8 flex justify-center text-xs rounded-lg shadow-sm border-none focus:ring-0'
				  >
					{years.map((option) => {
					  return (
						<option key={option} value={option}>
						  {option}
						</option>
					  );
					})}
				  </select>
  
				  <select
					value={months[getMonth(date)]}
					onChange={({ target: { value } }) => {
					  return changeMonth(months.indexOf(value));
					}}
					className='h-8 flex justify-center mx-2 text-xs rounded-lg shadow-sm border-none focus:ring-0'
				  >
					{months.map((option) => {
					  return (
						<option key={option} value={option} >
						  {option}
						</option>
					  );
					})}
				  </select>
				  <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
					<ChevronRightIcon className='h-4 w-4 text-primary'/>
				  </button>
				</div>
			  );
			}}
			showIcon={icon ? true : false}
			selected={value}
			onChange={onChange}
			// onBlur={onBlur}
			icon={icon ? icon : undefined}
			className={`w-full rounded-md text-sm h-9 shadow-sm focus:ring-0 z-50 ${border ? "border border-gray-200 focus:ring-gray-200 outline-none focus:outline-none" : "border-none focus:ring-0 "}`}
			isClearable
			disabled={disabled}
			filterDate={date => {
			  return inactiveDate ? date <= inactiveDate : date;
			}}
			timeInputLabel={time && t('common:time')}
			dateFormat={time ? "MM/dd/yyyy h:mm aa" : "MM/dd/yyyy"}
			showTimeInput={time}	  
		  />
		</div>
		{error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
	  </div>
	);
  };

export default InputDate;

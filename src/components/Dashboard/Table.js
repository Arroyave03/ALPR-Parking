import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useTranslation } from 'react-i18next';

const Table = ({ employees, handleEdit, handleDelete }) => {
  const { t } = useTranslation();

  employees.forEach((employee, i) => {
    employee.id = i + 1;
  });

  /*

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  */

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>{t('dashboard.number')}</th>
            <th>{t('dashboard.name')}</th>
            <th>{t('license_plate')}</th>
            <th>{t('house')}</th>
            <th>{t('car_model')}</th>
            <th>{t('date')}</th>
            <th colSpan={2} className="text-center">
              {t('actions')}
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.id}>
                <td>{i + 1}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
                <td>{employee.date} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="button muted-button"
                  >
                    {t('dashboard.edit')}
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="button muted-button"
                  >
                    {t('dashboard.delete_confirm_button')}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>{t('dashboard.no_users')}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Dashboard.css';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import { useTranslation } from 'react-i18next';

import { employeesData } from '../../data';

const Dashboard = ({ setIsAuthenticated }) => {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState(employeesData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('employees_data2'));
    if (data !== null && Object.keys(data).length !== 0) setEmployees(data);
  }, []);

  const handleEdit = id => {
    setSelectedEmployee(id);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: t('dashboard.delete_confirm_title'),
      text: t('dashboard.delete_confirm_text'),
      showCancelButton: true,
      confirmButtonText: t('dashboard.delete_confirm_button'),
      cancelButtonText: t('dashboard.delete_cancel_button'),
    }).then(result => {
      if (result.value) {
        const [employee] = employees.filter(employee => employee.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Eliminado!',
          text: `${employee.firstName} ha sido eliminado.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const employeesCopy = employees.filter(employee => employee.id !== id);
        localStorage.setItem('employees_data2', JSON.stringify(employeesCopy));
        setEmployees(employeesCopy);
      }
    });
  };

  return (
    <div id="table-main-screen">
      <div className="container">
        {!isAdding && !isEditing && (
          <div className='table-screen'>
            <Header
              setIsAdding={setIsAdding}
              setIsAuthenticated={setIsAuthenticated}
            />
            <div style={{ marginTop: '9vh', marginBottom: '4vh' }}></div>
            <div className="table-container">
              <Table
                employees={employees}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        )}
        {isAdding && (
          <Add
            employees={employees}
            setEmployees={setEmployees}
            setIsAdding={setIsAdding}
          />
        )}
        {isEditing && (
          <Edit
            employees={employees}
            selectedEmployee={selectedEmployee}
            setEmployees={setEmployees}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
      <div className="wallpaper"></div>
    </div>

  );
};

export default Dashboard;
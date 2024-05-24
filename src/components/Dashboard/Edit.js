import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {
  const id = selectedEmployee.id;
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [salary, setSalary] = useState(null);
  const [date, setDate] = useState(null);

  const handleUpdate = e => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !salary || !date) {
      return Swal.fire({
        icon: 'error',
        title: t('error'),
        text: t('all_fields_required'),
        showConfirmButton: true,
      });
    }

    const employee = {
      id,
      firstName,
      lastName,
      email,
      salary,
      date,
    };

    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        employees.splice(i, 1, employee);
        break;
      }
    }

    localStorage.setItem('employees_data2', JSON.stringify(employees));
    setEmployees(employees);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Actualizado!',
      text: `${employee.firstName}, ${t('license_plate')}: ${employee.lastName}, ${t('has_been_updated')}.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className='edit-screen'>
      <div classname="edit-container">
        <div className="edit-box">
          <form onSubmit={handleUpdate}>
            <h1>{t('edit_vehicle')}</h1>
            <label htmlFor="firstName">{t('name')}</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">{t('license_plate')}</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <label htmlFor="email">{t('house')}</label>
            <input
              id="email"
              type="number"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="salary">{t('car_model')}</label>
            <input
              id="salary"
              type="date"
              name="salary"
              value={salary}
              onChange={e => setSalary(e.target.value)}
            />
            <label htmlFor="date">{t('date')}</label>
            <input
              id="date"
              type="date"
              name="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
            <div style={{ marginTop: '30px' }}>
              <input type="submit" value={t('update')} />
              <input
                style={{ marginLeft: '12px' }}
                className="muted-button"
                type="submit"
                value={t('cancel')}
                onClick={() => setIsEditing(false)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
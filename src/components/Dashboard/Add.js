import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const Add = ({ employees, setEmployees, setIsAdding }) => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !salary || !date) {
      return Swal.fire({
        icon: 'error',
        title: t('error'),
        text: t('all_fields_required'),
        showConfirmButton: true,
      });
    }

    const id = employees.length + 1;
    const newEmployee = {
      id,
      firstName,
      lastName,
      email,
      salary,
      date,
    };

    employees.push(newEmployee);
    localStorage.setItem('employees_data2', JSON.stringify(employees));
    setEmployees(employees);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: t('added'),
      text: `${firstName} ${t('has_been_added')}`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className='edit-screen'>
      <div classname="edit-container">
        <div className="edit-box">
          <form onSubmit={handleAdd}>
            <h1>{t('add_vehicle')}</h1>
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
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="salary">{t('car_model')}</label>
            <input
              id="salary"
              type="text"
              name="salary"
              value={salary}
              onChange={e => setSalary(e.target.value)}
            />
            <label htmlFor="date">{t('date')}</label>
            <input
              id="date"
              type="text"
              name="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
            <div style={{ marginTop: '30px' }}>
              <input type="submit" value={t('add')} />
              <input
                style={{ marginLeft: '12px' }}
                className="muted-button"
                type="submit"
                value={t('cancel')}
                onClick={() => setIsAdding(false)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
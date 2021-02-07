import React, { useState } from 'react';
import TechSelectOptions from '../techs/TechSelectOptions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLog } from '../../actions/logActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddLogModal = ({ addLog }) => {
  const [message, setMessage] = useState('');
  const [critical, setCritical] = useState(false);
  const [technician, setTechnician] = useState('');

  const onSubmit = () => {
    if (message === '' || technician === '') {
      M.toast({ html: 'Please enter a message and tech' });
    } else {
      const newLog = {
        message,
        critical,
        technician,
        date: new Date()
      };

      addLog(newLog);

      M.toast({ html: `Log added by ${technician}` });

      // Clear Fields
      setMessage('');
      setTechnician('');
      setCritical(false);
    }
  };

  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <label htmlFor='message' className='active'>
              Log Message
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <select
              name='tech'
              value={technician}
              className='browser-default'
              onChange={e => setTechnician(e.target.value)}
            >
              <option value='' disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={critical}
                  value={critical}
                  onChange={e => setCritical(!critical)}
                />
                <span>Critical</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect blue waves-light btn'
        >
          Enter
        </a>
      </div>
    </div>
  );
};

AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired
};

const modalStyle = {
  width: '75%',
  height: '75%'
};

export default connect(
  null,
  { addLog }
)(AddLogModal);

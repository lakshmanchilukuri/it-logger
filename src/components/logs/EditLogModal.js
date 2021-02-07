import React, { useState, useEffect } from 'react';
import TechSelectOptions from '../techs/TechSelectOptions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateLog } from '../../actions/logActions';

const EditLogModal = ({ current, updateLog }) => {
  const [message, setMessage] = useState('');
  const [critical, setCritical] = useState(false);
  const [technician, setTechnician] = useState('');

  useEffect(() => {
    if (current) {
      console.log('in if current');

      setMessage(current.message);
      setCritical(current.critical);
      setTechnician(current.technician);
    }
  }, [current]);

  const onSubmit = () => {
    if (message === '' || technician === '') {
      M.toast({ html: 'Please enter a message and tech' });
    } else {
      const updLog = {
        id: current.id,
        message,
        critical,
        technician,
        date: new Date()
      };

      updateLog(updLog);
      M.toast({ html: `Log updated by ${technician}` });

      // Clear Fields
      setMessage('');
      setTechnician('');
      setCritical(false);
    }
  };

  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
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
              <option value="Jon Snow">Jon Snow</option>
              <option value="Alliser Thorne">Alliser Thorne</option>
              <option value="Samwell Tarley">Samwell Tarley</option>
 
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
                  checked={critical ? critical : false}
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

const modalStyle = {
  width: '75%',
  height: '75%'
};

EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.log.current
});

export default connect(
  mapStateToProps,
  { updateLog }
)(EditLogModal);

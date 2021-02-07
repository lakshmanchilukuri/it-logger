import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteLog, setCurrentLog } from '../../actions/logActions'
import Moment from 'react-moment';


const LogItem = ({ log, deleteLog, setCurrentLog }) => {

  const onDelete = () => {
    console.log('on deleet trigg');
    deleteLog(log.id)
  }

  const setCurrent = () => {
    console.log('on setCurrent trigg');
    setCurrentLog(log)
  }
  return (
    <li className='collection-item'>
      <div>
        <a
          href='#edit-log-modal'
          className={`modal-trigger ${log.critical ? 'red-text' : 'blue-text'
            }`}

          onClick={() => setCurrentLog(log)}>
          {log.message}
        </a>
        <br />
        <span className='grey-text'>
          <span className='black-text'>ID #{log.id}</span> last updated by{' '}
          <span className='black-text'>{log.technician}</span> on{' '}
          <Moment format='MMMM Do YYYY, h:mm:ss a'>{log.date}</Moment>
        </span>
        <a href='#!' className='secondary-content'>
          <i className='material-icons grey-text' onClick={onDelete}>delete</i>
        </a>
      </div>
    </li>
  )


};

LogItem.propTypes = {
  deleteLog: PropTypes.func.isRequired,
  setCurrentLog: PropTypes.func.isRequired
};

export default connect(null, { deleteLog, setCurrentLog })(LogItem);

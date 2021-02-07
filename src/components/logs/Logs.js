import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLogs } from '../../actions/logActions';
import LogItem from '../logs/LogItem';
import Loader from "react-loader-spinner";

const Logs = ({ log: { loading, logs }, getLogs }) => {

  useEffect(() => {
    getLogs();
  }, [getLogs])


  if (loading) {
    console.log('loadigng ');
    return <Loader type="TailSpin" color="#00BFFF" height={500} width={100} />
  }

  return (

    < ul className='collection with-header' >
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {
        !loading && logs !== null && logs.length === 0 ? (
          <p className='center'>No logs to show...</p>
        ) : (
            logs !== null && logs.map(log => <LogItem log={log} key={log.id} />)
          )
      }
    </ul >

  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
  log: state.log
});



export default connect(mapStateToProps, { getLogs })(Logs);

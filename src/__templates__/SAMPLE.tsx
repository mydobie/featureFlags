import React, { useEffect /* , useState */ } from 'react';
// import {  } from 'react-bootstrap';

interface Props {}

const defaultProps = {};

const SAMPLE = (props: Props) => {
  // const {} = props;

  // const [myStateValue, setMyStateValue] = useState('initialValue');

  useEffect(() => {});

  // useEffect(() => {
  //   // code to run on mount or props change
  //   return () => {
  //     // this function is run on clean up
  //   };
  // }, []);

  const myVar = 'Hello world';
  return (
    <div>
      <strong>CONTENT GOES HERE - {myVar}</strong>
    </div>
  );
};

SAMPLE.defaultProps = defaultProps;

export default SAMPLE;

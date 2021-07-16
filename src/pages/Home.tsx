import React from 'react';

const Home = () => (
  <div className='container'>
    <div className='row'>
      <div className='col'>
        <h1>Feature Flags demo</h1>
        <p>This demo .... </p>
      </div>
    </div>
    <div className='row'>
      <div className='col'>
        <hr />
        <h2>Version: </h2>
        <ul>
          <li>
            <strong>Project Name: </strong>
            {process.env.REACT_APP_NAME}
          </li>
          <li>
            <strong>Project Version: </strong>
            {process.env.REACT_APP_VERSION}
          </li>
          <li>
            <strong>State persists on refresh: </strong>
            {process.env.REACT_APP_USE_LOCAL_STORAGE
              ? process.env.REACT_APP_USE_LOCAL_STORAGE
              : 'false'}
          </li>
          <li>
            <strong>Git Commit: </strong>
            {process.env.REACT_APP_GIT_SHA}
          </li>
          <li>
            <strong>React Version: </strong>
            {React.version}
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// interface State {
//   sampleState: string;
// }

// class Home extends React.Component<Props, State> {
//   static defaultProps = { helloMessage: 'Hello world!!!' };

//   constructor(props: Props) {
//     super(props);
//     this.state = { sampleState: props.helloMessage };
//   }

//   render() {
//     const { helloMessage } = this.props;
//     const { sampleState } = this.state;
//     return (
//       <Container>
//         <Row>
//           <Col>
//             <Jumbotron>
//               <h1 className='display-3' id='helloId'>
//                 {helloMessage}
//               </h1>
//               <p className='lead'>This is the home page for an application</p>
//               <p>{sampleState}</p>
//             </Jumbotron>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }

export default Home;

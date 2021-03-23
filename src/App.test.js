
 import { render, screen, fireEvent,act } from '@testing-library/react';
// import User from './User';
// import ReactDOM from 'react-dom';
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
// import App from './App';
import Login from './Login';
import Dashboard from './Dashboard';
import Devices from './Devices';
import User from './User';

const firebase = require('@firebase/testing')

const admin = require('firebase-admin')

const projectId = "iot-dashboard-a6a92"
process.env.GCLOUD_PROJECT = projectId
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
let app = admin.initializeApp({projectId})
//let db = firebase.firestore(app)
const auth = "user_abc"

const myAuth = {uid: auth, email: "random@rand.com"}

configure({ adapter: new Adapter() });

function getFirestore(auth) {

  return firebase.initializeTestApp({projectId: projectId, auth: auth}).firestore()
}



// When Document written to '/TestCollection/{DocumentId}' , trigger function to copy it to '/Copies/{DocumentId}
test("Expect to find a copy in 'Copies' Collection", async ()=>{

    const db = getFirestore(myAuth)

    const testDoc = db.collection("users").doc(auth)
    await firebase.assertSucceeds(testDoc.set({foo: "bar"}));

})

describe("Authentication",  () => {

       it('render 2 input components', () => {

       
      const {getByLabelText} = render(<Login/>);
     expect(getByLabelText(/Username/i)).toBeInTheDocument();
     expect(getByLabelText(/Password/i)).toBeInTheDocument();
    });

  })

  describe("Device page",  () => {

    const db = getFirestore(myAuth)

    const wrapper = shallow(<Devices />);

      it('render device page and elements',  async () => {

        
       
       expect(wrapper.find('h2').text()).toEqual('Devices')

       expect(wrapper.find('Button').text()).toEqual('Add device')

    })

    it("test 'add device' button",  async () => {

      const openModal = jest.fn();

    const button = shallow((<Devices onClick={openModal}/>));
     button.find('#add-device').simulate('click')

     wrapper.find()
    expect((openModal)).toHaveBeenCalled()
    


  })
})
    //     const button = getByTestId('Button')
    //     const mockCallBack = jest.fn();

    //     await act (async () => {
    //       fireEvent.submit(getByTestId('form'))
    //     });

    //     expect(mockCallBack.mock.calls.length).toEqual(1);

  
    // });




// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<User />, div);
//   ReactDOM.unmountComponentAtNode(div);
// })




// describe("Login render Page", () => {
//   it('renders the Login page', () => {
//     const {getByText} = render(<Login/>);
//     expect(getByText(/login/i)).toBeInTheDocument();
//   });
// })



//   it('render 2 input components', () => {
//     const {getByLabelText} = render(<Login/>);
//     expect(getByLabelText(/Username/i)).toBeInTheDocument();
//     expect(getByLabelText(/Password/i)).toBeInTheDocument();
//   });
// })

// describe("Form behaviour",  () => {

//   firebase.initializeTestApp({
//     projectId: "my-test-project",
//     auth: { uid: "alice", email: "alice@example.com" }
//   });

//   it('validate user inputs, and provides error messages', async () => {
//     const { getByTestId, getByText } = render(<Login/>)

  

//     await act (async () => {
//       fireEvent.change(screen.getByLabelText(/Username/i), {
//         target: {value: 'test@test.com'},
//       });
  

//     fireEvent.change(screen.getByLabelText(/Password/i), {
//       target: {value: '123456'},
//     })
//   })
//     fireEvent.click(getByTestId('form'))
//   });

//   const wrapper = shallow(<User />);
//   const text = wrapper.find("p").text()
//   expect(text).toEqual("true");
// })

    // await act (async () => {
    //   const button = getByText(/Sign Up/i)
    //    fireEvent.click(button)
    //   const emailError = getByTestId("emailerror").value
    //   expect(emailError).toMatch("test");
    // });



   
    
  




    

    // it('renders dashboard', () => {
    //   const div = document.createElement('div');

    //   fire.auth()
    //   .signInWithEmailAndPassword("test@test.com", "123456")
  
    //    ReactDOM.render(<Dashboard />, div);
    //    ReactDOM.unmountComponentAtNode(div);
  
    //   });

   

       

      

   
 


// describe('handleLogOut', () => {
// beforeAll(function() {
//  firebase.auth = jest.fn().mockReturnValue({
//  currentUser: true,
//  });
// });
 



 
//   it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);

//  });
// });



//   describe('firebase Util Test Suite', () => {

//     beforeAll(async () => {

//       jest.setTimeout(10000)
//       await init()
//     })
//   }

//   beforeEach(async() => {
//     await 
//   })

// })
//
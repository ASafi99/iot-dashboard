import './App.css';
import Header from './Header';
import NavBar from './NavBar';


function App({handleLogOut}) {

  
  return (
    <div className="App">
      <Header handleLogOut={handleLogOut} />
        <NavBar/>
        {/* <hr/>
        <hr/>
        <hr/>
        <hr/>
        <hr/>
        <button style = {{size: "40px"}} onClick = {handleLogOut}>logout</button> */}
    </div>
  );
}
export default App;
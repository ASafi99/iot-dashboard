import './App.css';
import Header from './Header';
import NavBar from './NavBar';


function App({handleLogOut}) {

  
  return (
    <div className="App">
      <Header handleLogOut={handleLogOut} />
        <NavBar/>
    </div>
  );
}
export default App;
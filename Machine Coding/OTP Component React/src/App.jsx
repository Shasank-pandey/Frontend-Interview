import './App.css';
import Otp from './Otp';

function App() {
  return (
    <div>
      <Otp length={4} onComplete={(otp) => {console.log(otp, "OTP")}} />
    </div>
  );
}

export default App;

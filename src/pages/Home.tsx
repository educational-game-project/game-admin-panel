import 'react-toastify/dist/ReactToastify.min.css';
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
  showWarningToast,
} from '../utilities/toastUtils';

function Home() {
  const notify_1 = () => showSuccessToast('Login successfully !');
  const notify_2 = () => showInfoToast('Login successfully !');
  const notify_3 = () => showWarningToast('Login successfully !');
  const notify_4 = () => showErrorToast('Login successfully !');

  return (
    <div className="h-[1500px]">
      <h5 className="font-bold text-xl">Home</h5>
      <div>
        <button onClick={notify_1}>Notify 1 !</button>
        <button onClick={notify_2}>Notify 2 !</button>
        <button onClick={notify_3}>Notify 3 !</button>
        <button onClick={notify_4}>Notify 4 !</button>
      </div>
    </div>
  );
}

export default Home;

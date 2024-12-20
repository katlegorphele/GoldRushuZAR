import React from 'react';
import { ErrorIcon, SuccessIcon } from '../constants/icons';

const LoadingModal = ({ message, isError, isSuccess, isLoading, isOpen, closeModal }) => {
  // const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      id="default-modal" 
      tabIndex="-1" 
      aria-hidden={!isOpen}
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-opacity-50 overflow-y-auto overflow-x-hidden"
    >
      <div className="flex justify-center relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-[#0b0e38] rounded-lg shadow dark:bg-gray-700 w-1/2">
          <div className="flex items-center justify-end p-4 md:p-5 rounded-t ">
            <button 
              type="button" 
              onClick={closeModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4 text-white">
            <div className='flex justify-center w-full pb-8'>
            {
              isLoading ? <LoadingSpinner /> : isSuccess ? <SuccessAlert /> : <ErrorAlert />
            }
            </div>
            {isLoading ? <></> : message}            
            
          </div>
          <div className="flex items-center justify-center p-4 md:p-5  rounded-b">
            <button 
              type="button" 
              onClick={closeModal}
              className="text-white bg-[#0091fc] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const ErrorAlert = () => {
  return (
    <div className='bg-red-700 h-[64px] w-[64px] rounded-full flex items-center justify-center text-white'>
      <ErrorIcon />
    </div>
  )
}


const SuccessAlert = () => {
  return (
    <div className='bg-green-700 h-[64px] w-[64px] rounded-full flex items-center justify-center text-white'>
      <SuccessIcon />
    </div>
  )
}


const LoadingSpinner = () => {
  return (
    <div role="status">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingModal;

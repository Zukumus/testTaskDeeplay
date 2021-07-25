import React from 'react';
import '../Modal/modal.css';

const Modal = ({ active, setActive, children }) => {

   return (
      <div className={active ? "Modal Active" : "Modal"} onDoubleClick={() => { setActive(false) }}>
         <div id="modal" className={active ? "Modal__Content Active" : "Modal__Content"} onClick={e => { e.stopPropagation() }}>
            {children}
         </div>
      </div>
   );
};
export default Modal
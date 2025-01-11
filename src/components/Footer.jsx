import TrashCan from '../assets/icons/trashcan.svg?react';


function Footer({deleteIconRef, deleteItem}) {
  return (
    <footer className=" flex flex-row justify-between w-full text-secondary relative">
      <small>Copyright &copy; 2024</small>
      <small>Powered by Vite</small>
      <div ref={deleteIconRef} onClick={deleteItem} className='hover:cursor-pointer hover:top-0 transition-all z-50 absolute top-5 right-20'>
      <TrashCan  className="w-32 h-32 " color="white"/>
      </div>
    </footer>
  )
}

const TrashBin = () => {
  return(
    <>
    </>
  )
}
export default Footer
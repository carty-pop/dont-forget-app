import BringAllInsideIcon from "../assets/icons/bagin.svg?react"
import ThrowAllOutisideIcon from "../assets/icons/bagout.svg?react"
import DeleteallIcon from "../assets/icons/bagdel.svg?react"
function Sidebar({itemsOutsideBag, itemsInsideBag, setItemsInsideBag, setItemsOutsideBag, itemCount, setItemCount}) {
  const buttonInfo = [
    {
      text: "Bring all inside",
      onClick: () => {
        setItemsInsideBag(prevItems => [...prevItems, ...itemsOutsideBag]);
        setItemsOutsideBag([]);
        localStorage.setItem('itemsOutsideBag', JSON.stringify([]));
        localStorage.setItem('itemsInsideBag', JSON.stringify([...itemsInsideBag, ...itemsOutsideBag]));
      },
      disabled : itemsOutsideBag.length === 0,
      color: "btn-neutral",
      icon: <BringAllInsideIcon className="w-6 h-6 " fill="white"/>
    },
    {
      text: "Throw all out",
      onClick: () => {
        setItemsOutsideBag(prevItems => [...prevItems, ...itemsInsideBag]);
        setItemsInsideBag([]);
        localStorage.setItem('itemsInsideBag', JSON.stringify([]));
        localStorage.setItem('itemsOutsideBag', JSON.stringify([...itemsOutsideBag, ...itemsInsideBag]));
      },
      disabled : itemsInsideBag.length === 0,
      color: "btn-neutral",
      icon: <ThrowAllOutisideIcon className="w-6 h-6" fill="white"/>
    },
    {
      text: "Delete all",
      onClick: () => {
        setItemsInsideBag([]);
        setItemsOutsideBag([]);
        setItemCount(0)
        localStorage.clear();
      },
      disabled : itemsInsideBag.length === 0 &&	 itemsOutsideBag.length === 0,
      color: "btn-primary",
      icon: <DeleteallIcon className="w-6 h-6" fill="white"/>
    },
  ]
  return (
    <aside className="border-r  border-neutral/50 basis-1/3 p-2 flex flex-col justify-between space-y-2">
      <div className="flex justify-center items-center flex-1">
        <ItemsNumberTrack totalItems={itemsOutsideBag?.length} itemsInBag={itemsInsideBag?.length}/>
      </div>
      <div className="space-y-2">
      {
        buttonInfo.map((button, index) => {
          return <UtilitieButton key={index} text={button.text} onClick={button.onClick} color={button.color} icon={button.icon} disabled={button.disabled}/>
        })
      }
      </div>

    </aside>

  )
}

const UtilitieButton = ({text, onClick, color, icon, disabled}) => {
  return (
    <button disabled={disabled}  onClick={onClick} className={`btn w-full btn  ${color} ${disabled && "btn-disabled"} `}>     
      {icon}
      {text}
    </button>
  )
}

const ItemsNumberTrack = ({totalItems, itemsInBag}) => {
  return (
    <div className="flex flex-row space-x-2 h-full items-center">
      <span className="text-5xl text-neutral/50 mb-10">{itemsInBag? itemsInBag : 0 }</span>
      <span className="text-5xl text-neutral/50 ">/</span>
      <span className="text-5xl font-bold text-neutral/50 mt-10">{totalItems}</span>
      </div>
  )}

export default Sidebar
import PlusIcon from "../assets/icons/ic--round-plus.svg?react"


function OutBagList({newItem, setNewItem, itemsOutsideBag, addItem, handleItemClick, outsideBagContainerRef}) {

  
  return (
    <div className=" flex flex-col h-full w-full rounded-lg bg-rose-950/80 p-2">
      <div className="flex flex-row space-x-2">
        <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Add items" className=" basis-4/5 input input-ghost text-base-200 w-full max-w-xs bg-transparent focus:text-base-200" />
        <button onClick={addItem} className="font-bold text-2xl basis-1/5 btn btn-primary">
          <PlusIcon className="w-6 h-6" /></button>
      </div>
      <div ref={outsideBagContainerRef}  className="flex flex-1">
        <ul className="size-full relative">
          {
            itemsOutsideBag.map(({ itemName, style, id }, index) => (
              <li 
              key={index} 
              id={id}
              style={style} 
              onClick={(e) => handleItemClick(e) } 
              className="tagItem absolute z-50 p-2 bg-neutral-content rounded-lg text-primary shadow-lg hover:border hover:border-secondary cursor-pointer select-none"
            >
              {itemName}
            </li> 
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default OutBagList
function OnBagList({ insideBagContainerRef, itemsInsideBag, handleItemClick}) {


  
  return (
    <div ref={insideBagContainerRef} className="basis-2/3 flex flex-col">
      {itemsInsideBag.length > 0 ? (
      
      <div className="flex flex-col flex-1 m-2 border border-neutral/50 box-border rounded-lg space-y-2 py-1">
        {
          itemsInsideBag.map((item, index) => (
            <li 
            onClick={(e) => handleItemClick(e)}
            key={index} 
            id={item.id}
            className="tagItem absolute mx-1 py-2 px-4 border border-neutral/50 text-primary select-none list-none rounded-lg"
            >
              
              {item.itemName}
            </li>
          ))
        }
      </div>
      ):(
      <div className="flex flex-col justify-center items-center flex-1 m-2 border border-neutral/50 box-border rounded-lg">
        <p className="font-bold text-">The bag is empty</p>
        <p>Click, drag and drop some items inside</p>
      </div>
      )}

    </div>
  )
}

export default OnBagList
import { useState, useRef, useEffect } from "react"

import BackgroundHeading from "./components/BackgroundHeading"
import Footer from "./components/Footer"
import OnBagList from "./components/OnBagList"
import OutBagList from "./components/OutBagList"
import Sidebar from "./components/Sidebar"


const App = () => {

  const [itemsOutsideBag, setItemsOutsideBag] = useState([]);
  const [itemsInsideBag, setItemsInsideBag] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [itemsCount, setItemsCount] = useState(0);

  
  useEffect(() => {


    const storedItemsOutsideBag = localStorage.getItem('itemsOutsideBag');
    const storedItemsInsideBag = localStorage.getItem('itemsInsideBag');
    const storedItemsCount = localStorage.getItem('itemsCount');
    const parsedItemsOutsideBag = storedItemsOutsideBag && JSON.parse(storedItemsOutsideBag);
    const parsedItemsInsideBag = storedItemsInsideBag && JSON.parse(storedItemsInsideBag);
    
    console.log(parsedItemsOutsideBag, storedItemsOutsideBag);
    if (storedItemsOutsideBag) {
      setItemsOutsideBag(parsedItemsOutsideBag);
    }
    if (storedItemsInsideBag) {
      setItemsInsideBag(parsedItemsInsideBag);
    }

    if(JSON.parse(storedItemsCount) > 0 ){
      setItemsCount(JSON.parse(storedItemsCount));
    }

    if(parsedItemsInsideBag?.length === 0 && parsedItemsOutsideBag?.length === 0){ 
      localStorage.setItem('itemsCount', JSON.stringify(0));
      setItemsCount(0);
    }

  }, [])

  const randomTopAndLeft = (max, min) => {
    const random =  Math.floor(Math.random() * (max - min) + min) + '%';
    return random;
  }

  const randomRotation = (max , min) => {
    const random =  Math.floor(Math.random() * (max - min) + min) + 'deg';
    return random;

  }

  const addItem = () => {
    if (newItem === '') {
      return;
    }
    setItemsCount(prevCount => {
      const newCount = prevCount + 1;
      localStorage.setItem('itemsCount', JSON.stringify(newCount));
      return newCount;
    });
    setItemsOutsideBag( prevItems => {
      const newItemInsideBag = [
        ...prevItems, 
        {
          id: itemsCount,
          itemName: newItem,
          style: {
            top: randomTopAndLeft(80, 10),
            left: randomTopAndLeft(80, 10),
            transform: `rotate(${randomRotation(30, -30)})`, 
          }
        }
      ]
      localStorage.setItem('itemsOutsideBag', JSON.stringify(newItemInsideBag));
      return newItemInsideBag;
    })
    setNewItem('');
  }

  const deleteIconRef = useRef(null);

  const deleteItem = () => {
    
    if(targetElementRef.current) {
      setItemsInsideBag(prevItems => prevItems.filter(item => item.id !== Number(targetElementRef.current.id)));
      setItemsOutsideBag(prevItems => prevItems.filter(item => item.id !== Number(targetElementRef.current.id)));
      localStorage.setItem('itemsOutsideBag', JSON.stringify(itemsOutsideBag.filter(item => item.id !== Number(targetElementRef.current.id))));
      localStorage.setItem('itemsInsideBag', JSON.stringify(itemsInsideBag.filter(item => item.id !== Number(targetElementRef.current.id))));
      window.removeEventListener('mousemove', handleMouseMove);

      return
    }
    console.log('no elemento')
  }

  const targetElementRef = useRef(null);
  const insideBagContainerRef = useRef(null);
  const AABBForInsideBagContainer = () => {
    const rect = insideBagContainerRef.current.getBoundingClientRect();
    const rect2 = targetElementRef.current?.getBoundingClientRect();
    if(targetElementRef.current !== undefined && rect2 !== undefined) {
      return !(rect.top > rect2.bottom || 
        rect.bottom < rect2.top ||
        rect.left > rect2.right || 
        rect.right < rect2.left);
    }
  }

  const outsideBagContainerRef = useRef(null);
  const AABBForOutsideBagContainer = () => {

    const rect = outsideBagContainerRef.current.getBoundingClientRect();
    const rect2 = targetElementRef.current?.getBoundingClientRect();
    if(targetElementRef.current !== undefined && rect2 !== undefined) {
      return !(rect.top > rect2.bottom || 
        rect.bottom < rect2.top ||
        rect.left > rect2.right || 
        rect.right < rect2.left);
    }
  }

  
  let angle = 0;
  let diff;
  let prevX;
  let itemTagHeight;
  let itemTagWidth;

  const handleMouseMove = (event) => {
    if(!targetElementRef.current) {
      console.log('no target');
      return;
    }
    if(targetElementRef.current.style.position !== 'fixed') {
      targetElementRef.current.style.position = 'fixed';
    }

    const midPointWidth = itemTagWidth * 0.2;
    const midPointHeight = itemTagHeight * 0.5;
    const newX = event.pageX;
    const newY = event.pageY;
    targetElementRef.current.style.left = `${newX - midPointWidth - 2}px`;
    targetElementRef.current.style.top = `${newY - midPointHeight - 5}px`;
    if (prevX) {
      diff = newX - prevX;
    }
  
    prevX = event.pageX;
  };

  let previousLeft;
  let previousTop;
  let isHoldingTheItem = false;
  let originalRotationDeg  = 0;  
  
  const handleItemClick = (event) => {
    // console.log(itemsOutsideBag);
    targetElementRef.current = event.target;
    if(!targetElementRef.current) {
      console.log('no target');
      return;
    }

    originalRotationDeg = targetElementRef.current.style.transform.replace('rotate(', '').replace('deg)', '');

    itemTagHeight = targetElementRef.current.offsetHeight;
    itemTagWidth = targetElementRef.current.offsetWidth;
    
    if (isHoldingTheItem) {
      window.removeEventListener('mousemove', handleMouseMove);
      if(AABBForInsideBagContainer()) {
        console.log('clicked inside bag');
        const holdedItemId = Number(targetElementRef.current.id) ;
        const itemInArrayId = itemsOutsideBag.findIndex(item => item.id === holdedItemId);
        if(itemInArrayId !== -1) {
          setItemsInsideBag(prevItems => [...prevItems, itemsOutsideBag[itemInArrayId]]);
          setItemsOutsideBag(prevItems => prevItems.filter(item => item.id !== holdedItemId));
          localStorage.setItem('itemsOutsideBag', JSON.stringify(itemsOutsideBag.filter(item => item.id !== holdedItemId)));
          localStorage.setItem('itemsInsideBag', JSON.stringify([...itemsInsideBag, itemsOutsideBag[itemInArrayId]]));
          
        }
        targetElementRef.current = null;
        return isHoldingTheItem = false;
      } 

      if(AABBForOutsideBagContainer) {
        console.log('clicked outside bag');
        const holdedItemId = Number(targetElementRef.current.id) ;
        const itemInArrayId = itemsInsideBag.findIndex(item => item.id === holdedItemId);
        if(itemInArrayId !== -1) {
          setItemsOutsideBag(prevItems => [...prevItems, itemsInsideBag[itemInArrayId]]);
          setItemsInsideBag(prevItems => prevItems.filter(item => item.id !== holdedItemId));
          localStorage.setItem('itemsInsideBag', JSON.stringify(itemsInsideBag.filter(item => item.id !== holdedItemId)));
          localStorage.setItem('itemsOutsideBag', JSON.stringify([...itemsOutsideBag, itemsInsideBag[itemInArrayId]]));
        }
        
        targetElementRef.current = null;
        return isHoldingTheItem = false;
      }

      targetElementRef.current.style.left = `${previousLeft}`;
      targetElementRef.current.style.top = `${previousTop}`;
      targetElementRef.current = null;
      return isHoldingTheItem = false;
    }

    requestAnimationFrame(handlePendulumEffect);
    isHoldingTheItem = true;
    window.addEventListener('mousemove', handleMouseMove);
    previousLeft = targetElementRef.current.style.left;
    previousTop = targetElementRef.current.style.top;

  };

  const handlePendulumEffect = () => {
    if(targetElementRef.current) {
      angle = diff + 90;
      targetElementRef.current.style.transform = `rotate(${angle}deg)`;
    
    }
    requestAnimationFrame(handlePendulumEffect);
  };
  

  return (
    <>
    <BackgroundHeading/>
    <main className="w-full flex flex-row space-x-4 flex-1 z-20">
      <section className="basis-3/5 bg-neutral-content rounded-lg flex flex-row">
        <Sidebar setItemsInsideBag={setItemsInsideBag} setItemsOutsideBag={setItemsOutsideBag} itemsOutsideBag={itemsOutsideBag} itemsInsideBag={itemsInsideBag} itemsCount={itemsCount} setItemCount={setItemsCount}/>
        <OnBagList itemsInsideBag={itemsInsideBag}  insideBagContainerRef={insideBagContainerRef} handleItemClick={handleItemClick}/>
      </section>
      <section className="basis-2/5">
        <OutBagList addItem={addItem} outsideBagContainerRef={outsideBagContainerRef} itemsOutsideBag={itemsOutsideBag} setNewItem={setNewItem} newItem={newItem} handleItemClick={handleItemClick} />
      </section>
    </main>
    <Footer deleteIconRef={deleteIconRef}	deleteItem={deleteItem}/>
    </>
  )
}

export default App

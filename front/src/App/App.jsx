import { useEffect, useState } from 'react';
import Hello from '../components/Hello/Hello';
import styles from './App.module.css';
import Button from '../components/ui/Button/Button';
import AppScripts from './AppScripts';
import Finish from '../components/Finish/Finish';

const App = () => {
  // get Scripts
  const {sortImages} = AppScripts()

  // Data
  const images = ['memo-01.jpg', 'memo-02.jpg', 'memo-03.jpg', 'memo-04.jpg', 'memo-05.jpg', 'memo-06.jpg', 'memo-07.jpg', 'memo-08.jpg', 'memo-09.jpg', 'memo-10.jpg', 'memo-01.jpg', 'memo-02.jpg', 'memo-03.jpg', 'memo-04.jpg', 'memo-05.jpg', 'memo-06.jpg', 'memo-07.jpg', 'memo-08.jpg', 'memo-09.jpg', 'memo-10.jpg']
  const [cards, setCards] = useState([])
  const [roundsCount, setRoundsCount] = useState(0)
  const [selectedElements, setSelectedElements] = useState([])

  // after page load
  useEffect(() => {
    writeToCardsAllImages(images)
    document.title  = 'Worldskills Americas'
  }, [])

  // Cards Sorting
  function writeToCardsAllImages (massive) {
    setRoundsCount(0)

    const newData = sortImages(massive).map((item, key) => ({
      id: key,
      image: item,
      show: false, // ! IMPORTANT
      block: false
    }))

    setCards(newData)
  }

  // show card when u select 
  function showCard (e, card) {

    setCards(prevState=> prevState.map(obj =>
      obj.id == card.id ? {...obj, show: card.show? false: true} : obj
    ))
     // Selected Elements
    setSelectedElements((prevSelectedElements) => {
      const newSelectedElements = [...prevSelectedElements, card]

        // if 2 elements are selected 
      if (newSelectedElements.length === 2) {
        if (newSelectedElements[0].image === newSelectedElements[1].image) {
          setCards(prevState=> prevState.map(obj =>
            obj.image == card.image ? {...obj, show: true, block: true} : obj
          ))
          // count rounds
          setRoundsCount(roundsCount+1)
        } else {
         setTimeout(() => {
          // show is false 
          setCards(prevState=> prevState.map(obj =>
            obj.id == card.id ? 
            {...obj, show: false} : 
            {...obj, show: false}
          ))
         }, 500)
        }
        return []
      }
      return newSelectedElements
    })
  }

  return (
    <div 
    className={styles.app}
    >
      {roundsCount > 9? <Finish display='flex' opacity='1' scores={roundsCount} />: <></>}
      <Hello />
      <div className={styles.app__window}>
         <div className={styles.game__area}>
          <div className={styles.game__area__cards}>
            {cards.map((card, item) => 
              <div className={styles.card} key={item} onClick={(e) => showCard(e, card)}>
                {card.block? (<img src={`/${card.image}`} alt="{card.image}" />): (
                  card.show? 
                  (<img src={`/${card.image}`} alt="{card.image}" />): 
                  (<span>:]</span>)
                ) }
              </div>
            )}
          </div>
         </div>
         <div className={styles.stats}>
            <div className={styles.stats__header}>
              <span className={styles.stats__header__count}>Rounds: 
                {roundsCount}</span>
            </div>
            <div className={styles.stats__header}>
              <Button 
                onClick={() => writeToCardsAllImages(images)}>Restart</Button>
            </div>
         </div>
      </div>
    </div>
  )
}

export default App
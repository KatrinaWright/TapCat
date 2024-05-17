import { useEffect, useState } from "react"
import { PlayerId } from "rune-games-sdk/multiplayer"

import selectSoundAudio from "./assets/select.wav"
import { GameState } from "./logic.ts"

const selectSound = new Audio(selectSoundAudio)

function App() {
  const [game, setGame] = useState<GameState>()
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>()

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game)
        setYourPlayerId(yourPlayerId)

        if (action && action.name === "claimCell") selectSound.play()
      },
    })
  }, [])

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return
  }

  const { winCombo, cells, lastMovePlayerId, playerIds, freeCells } = game

  return (
    <>
      {/* <!-- Image Map Generated by http://www.image-map.net/ --> */}
<img src="./assets/o.svg" useMap="#image-map"></img>

<map name="image-map">
    <area target="_blank" alt="Face" title="Face" href="facebook.com" coords="594,446,255" shape="circle"></area>
    <area target="_blank" alt="backFootLeft" title="backFootLeft" href="github.com" coords="785,933,932,1020" shape="rect"></area>
    <area target="_blank" alt="backFootRight" title="backFootRight" href="paypal.com" coords="261,933,397,1018" shape="rect"></area>
    <area target="_blank" alt="foodBowl" title="foodBowl" href="doordash.com" coords="416,1079,442,981,453,952,472,942,495,934,505,929,513,905,540,896,566,899,591,908,602,922,632,923,665,930,694,935,723,947,736,961,747,975,753,988,756,1008,760,1029,764,1046,770,1069,772,1080,752,1094,672,1122,566,1127,450,1106,423,1093" shape="poly"></area>
    <area target="_blank" alt="mainBody" title="mainBody" href="24hourfitness.com" coords="429,1017,405,1005,402,932,305,922,314,839,348,782,380,757,387,688,405,646,501,685,570,706,644,703,701,684,748,663,786,657,802,723,803,764,847,788,873,831,881,884,882,916,880,924,792,924,785,940,782,1002,763,1013,755,970,727,943,696,933,660,923,624,919,604,916,620,899,660,877,681,828,677,786,651,754,614,740,568,737,530,762,507,807,512,839,538,884,540,890,518,894,502,907,498,924,469,936,446,949" shape="poly"></area>
    <area target="_blank" alt="sensitiveBelly" title="sensitiveBelly" href="uber.com" coords="595,822,81" shape="circle"></area>
    <area target="_blank" alt="tailUp" title="tailUp" href="google.com" coords="882,921,959,638" shape="rect"></area>
    <area target="_blank" alt="tailDown" title="tailDown" href="bing.com" coords="963,849,1074,976" shape="rect"></area>
    <area target="_blank" alt="outerHead" title="outerHead" href="gmail.com" coords="402,640,372,705,273,642,252,567,236,523,267,378,217,214,233,133,448,55,567,164,663,173,756,81,808,69,1012,182,956,396,981,477,972,555,926,636,879,636,873,716,826,710,813,741,806,704,798,674,792,647,754,653,799,611,834,552,850,490,852,421,843,360,811,299,767,248,713,216,678,198,599,186,515,194,440,230,396,272,362,324,339,396,333,460,344,514,372,576,402,624" shape="poly"></area>
    <area target="_blank" alt="tailMid" title="tailMid" href="hotmail.com" coords="966,764,1029,843,1070,841,1045,757,968,705" shape="poly"></area>
</map>

    </>
  )
}

export default App

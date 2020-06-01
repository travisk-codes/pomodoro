import React, { useState, useEffect, useRef } from 'react'
import './App.css'

const FIVE_MIN = 300
const TWENTY_FIVE_MIN = 1500
let timeBefore, timeAfter
let adjs = []
let adjTotal = 0

const App = () => {
	const [secondsRemaining, setSecondsRemaining] = useState(TWENTY_FIVE_MIN)
	const [isPaused, setisPaused] = useState(true)
	const [isBreak, setIsBreak] = useState(false)

	const alarmRef = useRef(null)

	useEffect(() => {
		if (isPaused) return
		if (secondsRemaining < 0) {
			if (isBreak) setSecondsRemaining(FIVE_MIN)
			else setSecondsRemaining(TWENTY_FIVE_MIN)
			setisPaused(true)
			alarmRef.current.play()
		}
		timeBefore = performance.now()
		const adjustment = timeBefore - timeAfter
		adjs.push(adjustment)
		adjs.forEach((adj) => (adjTotal += adj / adjs.length))
		console.log(adjTotal)
		const interval = setInterval(() => {
			setSecondsRemaining(secondsRemaining - 1)
			timeAfter = performance.now()
		}, 1000 - adjustment)
		return () => clearInterval(interval)
	}, [secondsRemaining, isPaused])

	const togglePause = () => {
		setisPaused(!isPaused)
	}

	const toggleBreak = () => {
		if (isBreak) {
			setSecondsRemaining(TWENTY_FIVE_MIN)
		} else {
			setSecondsRemaining(FIVE_MIN)
		}
		setIsBreak(!isBreak)
		setisPaused(true)
	}

	return (
		<div id='container'>
			<div id='pomodoro-timer'>
				<div id='seconds-left-display'>
					{`${isBreak ? '🧘‍♀️' : '🍅'} ${secondsRemaining}`}&nbsp;
				</div>
				<div>
					<button onClick={togglePause} id='play-pause-timer-button'>
						{isPaused ? 'Start' : 'Stop'}
					</button>
					<button onClick={toggleBreak} id='reset-timer-button'>
						{isBreak ? 'Break' : 'Pomodoro'}
					</button>
					<audio src='ding.mp3' ref={alarmRef} />
				</div>
			</div>
		</div>
	)
}

export default App

/**
 * timer.startPomodoro()
 * timer.startBreak()
 *
 */

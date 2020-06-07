import React, { useState, useEffect, useRef } from 'react'
import './App.css'

const FIVE_MIN = 300 // seconds
const TWENTY_FIVE_MIN = 1500 // seconds

const App = () => {
	// timer state, whether pomodoro or break
	const [secondsRemaining, setSecondsRemaining] = useState(TWENTY_FIVE_MIN)
	// whether the timer is running
	const [isPaused, setisPaused] = useState(true)
	// whether the timer is counting down a pomodoro or break
	const [isBreak, setIsBreak] = useState(false)

	// chime audio element to play on timer completion
	const alarmRef = useRef(null)

	// effect runs every second
	useEffect(() => {
		// skip timer state update, don't re-render
		if (isPaused) return
		// reset timer, pause timer, play chime
		if (secondsRemaining < 0) {
			if (isBreak) setSecondsRemaining(FIVE_MIN)
			else setSecondsRemaining(TWENTY_FIVE_MIN)
			setisPaused(true)
			alarmRef.current.play()
		}
		// if not paused or completed, decrement one second
		// TODO change to setTimeout
		const interval = setInterval(() => {
			setSecondsRemaining(secondsRemaining - 1)
		}, 1000)
		// remove interval when component will unmount
		return () => clearInterval(interval)
	}, [secondsRemaining, isBreak, isPaused])

	const togglePause = () => {
		setisPaused(!isPaused)
	}

	/**
	 * 1. reset timer
	 * 2. switch between pomodoro/break
	 * 3. pause the timer
	 */
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
					{// TODO pull out}
					{`${isBreak ? '🧘‍♀️' : '🍅'} ${secondsRemaining}`}
					&nbsp;
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

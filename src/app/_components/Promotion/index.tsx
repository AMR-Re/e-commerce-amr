'use client'
import React, { useEffect, useMemo, useState } from 'react'

import classes from './index.module.scss'

const Promotion: React.FC = () => {
	const targetDate: Date = useMemo(() => {
		const currentDate: Date = new Date()
		currentDate.setDate(currentDate.getDate() + 3)
		return currentDate
	}, [])

	const [time, setTime] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	useEffect(() => {
		const timerInterval: NodeJS.Timeout = setInterval(() => {
			const currentTime: Date = new Date()
			const timeDifference: number = Math.max(targetDate.getTime() - currentTime.getTime(), 0)

			const days: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
			const hours: number = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
			const minutes: number = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
			const seconds: number = Math.floor((timeDifference % (1000 * 60)) / 1000)

			setTime({ days, hours, minutes, seconds })

			if (timeDifference === 0) {
				clearInterval(timerInterval)
			}
		}, 1000)

		return () => {
			clearInterval(timerInterval)
		}
	}, [targetDate])

	return (
		<section className={classes.promotion}>
			<div className={classes.textBox}>
				<h3 className={classes.title}>Deals of the Month</h3>
				<p>
					Get ready for a shopping experience like never before with our Deals of the Month! Every purchase comes with
					exclusive perks and offers, making this month a celebration of savvy choices and amazing deals. Don't miss
					out! 🎁🛒
				</p>

				<ul className={classes.stats}>
					<StatBox label="Days" value={time.days} />
					<StatBox label="Hours" value={time.hours} />
					<StatBox label="Minutes" value={time.minutes} />
					<StatBox label="Seconds" value={time.seconds} />
				</ul>
			</div>
		</section>
	)
}

interface StatBoxProps {
	label: string
	value: number
}

const StatBox: React.FC<StatBoxProps> = ({ label, value }) => (
	<li className={classes.statBox}>
		<h4>{value}</h4>
		<p>{label}</p>
	</li>
)

export default Promotion

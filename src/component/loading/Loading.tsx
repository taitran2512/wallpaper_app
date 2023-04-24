import { colors, sizes } from 'core'
import React, { PureComponent } from 'react'
import { Animated, StyleSheet, View } from 'react-native'

import LoadingDots from './LoadingDots'

interface Props {}

interface States {
	visible: boolean
	text: string
}

export default class Loading extends PureComponent<Props, States> {
	private animate: any
	constructor(props: Props) {
		super(props)
		this.state = {
			visible: false,
			text: '',
		}
		this.animate = new Animated.Value(0)
	}

	show(text: string = '') {
		this.setState({ visible: true, text: text }, this.fadeIn)
	}

	hide() {
		this.faseOut()
		setTimeout(() => {
			this.setState({ visible: false, text: '' })
		}, 250)
	}

	isLoading() {
		return this.state.visible
	}

	fadeIn() {
		Animated.timing(this.animate, {
			toValue: 1,
			duration: 250,
			useNativeDriver: true,
		}).start()
	}

	faseOut() {
		Animated.timing(this.animate, {
			toValue: 0,
			duration: 250,
			useNativeDriver: true,
		}).start()
	}

	//*********************** */
	render() {
		return (
			<>
				{this.state.visible && (
					<Animated.View style={[StyleSheet.absoluteFill, { opacity: this.animate }]}>
						<View style={styles.container}>
							<View style={styles.child}>
								<LoadingDots />
							</View>
						</View>
					</Animated.View>
				)}
			</>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.bgTransparent,
		justifyContent: 'center',
		alignItems: 'center',
	},
	child: {
		backgroundColor: colors.white,
		borderRadius: sizes.s16,
		padding: sizes.s36,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

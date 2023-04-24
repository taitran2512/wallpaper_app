import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { sizes, Style } from 'core'
import { Device } from 'utils'

export default class ToastDebug extends Component<any, any> {
	constructor(props: any) {
		super(props)
		this.state = {
			message: '',
			show: false,
		}
	}
	show = (message: string) => {
		this.setState({ message, show: true }, () => {
			setTimeout(() => {
				this.hide()
			}, 2000)
		})
	}

	hide = () => {
		this.setState({ message: '', show: false })
	}

	render() {
		if (this.state.show) {
			return (
				<View style={styles.container}>
					<Text style={Style.txt12_white}>{this.state.message}</Text>
				</View>
			)
		}
		return null
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: sizes.s16 + Device.getStatusBarHeight(),
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		...Style.radius16,
		...Style.pv8,
		...Style.ph16,
		alignItems: 'center',
		alignSelf: 'center',
	},
})

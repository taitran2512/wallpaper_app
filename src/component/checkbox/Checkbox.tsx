import { images } from 'assets'
import { sizes, Style } from 'core'
import { get, isEqual, remove } from 'lodash'
import React, { memo, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { avatarUri, imageSource } from 'utils'
import Icon from '../image/Icon'

interface CheckboxProps {
	data: any
	labelKey: string
	iconKey?: string
	compareKey?: string
	iconSize?: number
	onChange: (value: any[]) => void
	value?: any[]
	header?: JSX.Element | null
	onEndReached?: any
	onEndReachedThreshold?: number
	avatarIcon?: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({
	data = [],
	labelKey = 'title',
	iconKey = '',
	compareKey = '',
	iconSize,
	onChange,
	value = [],
	header,
	avatarIcon,
	...props
}) => {
	const selectedValue = [...value]
	const compare = (e: any, item: any) => {
		return (compareKey && get(e, compareKey) === get(item, compareKey)) || isEqual(e, item)
	}

	const renderItemCheckbox = ({ item }: any) => {
		const isActive = selectedValue.some((e) => compare(e, item))
		return (
			<ItemCheckbox
				isActive={isActive}
				title={get(item, labelKey, '')}
				icon={
					avatarIcon ? avatarUri(get(item, iconKey, '')) : imageSource(get(item, iconKey, ''))
				}
				iconSize={iconSize}
				onChange={(active: boolean) => {
					if (active) {
						selectedValue.push(item)
						onChange(selectedValue)
					} else {
						remove(selectedValue, (e) => compare(e, item))
						onChange(selectedValue)
					}
				}}
			/>
		)
	}

	return (
		<FlatList
			{...props}
			data={data}
			renderItem={renderItemCheckbox}
			ListHeaderComponent={header}
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}
			keyExtractor={(e, index) => String(e?.id || index)}
		/>
	)
}

const ItemCheckbox = ({ isActive = false, title, icon, onChange, iconSize }: any) => {
	const [active, setActive] = useState<boolean>(isActive)
	useEffect(() => {
		setActive(isActive)
	}, [isActive])

	const onPress = () => {
		setActive(!active)
		onChange?.(!active)
	}

	return (
		<TouchableOpacity activeOpacity={0.8} style={styles.item_checkbox} onPress={onPress}>
			<View style={Style.row}>
				{!!icon && (
					<Icon
						source={icon}
						size={iconSize}
						radius={iconSize}
						style={Style.right12}
						disabled
					/>
				)}
				<Text style={Style.txt14}>{title}</Text>
			</View>
			<Icon
				size={sizes.s24}
				source={active ? images.ic_checkbox_checked : images.ic_checkbox}
				disabled
			/>
		</TouchableOpacity>
	)
}

export default memo(Checkbox)

const styles = StyleSheet.create({
	item_checkbox: {
		...Style.row_between,
		...Style.pv12,
	},
})

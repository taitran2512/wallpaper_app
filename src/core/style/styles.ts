import { StyleSheet } from 'react-native';

import sizes from '../size/sizes';
import { colors } from './colors';
import { fonts } from './fonts';

export const Style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	flex: {
		flex: 1,
	},
	flexGrow: {
		flexGrow: 1,
	},
	txtCenter: {
		textAlign: 'center',
	},
	//
	h1: {
		fontSize: sizes.s48,
		lineHeight: sizes.s56,
		fontFamily: fonts.bold,
		color: colors.text,
	},
	h2: {
		fontSize: sizes.s40,
		lineHeight: sizes.s48,
		fontFamily: fonts.bold,
		color: colors.text,
	},
	h3: {
		fontSize: sizes.s32,
		lineHeight: sizes.s40,
		fontFamily: fonts.bold,
		color: colors.text,
	},
	h4: {
		fontSize: sizes.s24,
		lineHeight: sizes.s32,
		fontFamily: fonts.bold,
		color: colors.text,
	},
	h5: {
		fontSize: sizes.s20,
		lineHeight: sizes.s32,
		fontFamily: fonts.bold,
		color: colors.text,
	},
	h6: {
		fontSize: sizes.s18,
		lineHeight: sizes.s24,
		fontFamily: fonts.bold,
		color: colors.text,
	},
	txt12: {
		fontSize: sizes.s12,
		lineHeight: sizes.s16,
		fontFamily: fonts.regular,
		color: colors.text,
	},
	txt12_white: {
		fontSize: sizes.s12,
		lineHeight: sizes.s16,
		fontFamily: fonts.regular,
		color: colors.white,
	},
	txt12_secondary: {
		fontSize: sizes.s12,
		lineHeight: sizes.s16,
		fontFamily: fonts.regular,
		color: colors.secondary_text,
	},
	txt14: {
		fontSize: sizes.s14,
		lineHeight: sizes.s20,
		fontFamily: fonts.regular,
		color: colors.text,
	},
	txt14_bold_black: {
		fontSize: sizes.s14,
		lineHeight: sizes.s20,
		fontFamily: fonts.bold,
		color: colors.black,
	},
	txt14_white: {
		fontSize: sizes.s14,
		lineHeight: sizes.s20,
		fontFamily: fonts.regular,
		color: colors.white,
	},
	txt14_secondary: {
		fontSize: sizes.s14,
		lineHeight: sizes.s20,
		fontFamily: fonts.regular,
		color: colors.secondary_text,
	},
	txt16: {
		fontSize: sizes.s16,
		lineHeight: sizes.s24,
		fontFamily: fonts.regular,
		color: colors.text,
	},
	txt16_blue: {
		fontSize: sizes.s16,
		lineHeight: sizes.s24,
		fontFamily: fonts.regular,
		color: colors.blue,
	},
	txt16_bold: {
		fontSize: sizes.s16,
		lineHeight: sizes.s24,
		fontFamily: fonts.bold,
		color: colors.text,
	},
	txt16_white: {
		fontSize: sizes.s16,
		lineHeight: sizes.s24,
		fontFamily: fonts.regular,
		color: colors.white,
	},
	txt16_secondary: {
		fontSize: sizes.s16,
		lineHeight: sizes.s24,
		fontFamily: fonts.regular,
		color: colors.secondary_text,
	},
	regular: {
		fontFamily: fonts.regular,
	},
	medium: {
		fontFamily: fonts.medium,
	},
	semibold: {
		fontFamily: fonts.semi_bold,
	},
	bold: {
		fontFamily: fonts.bold,
	},
	extrabold: {
		fontFamily: fonts.extra_bold,
	},
	//
	border: {
		borderWidth: sizes.s1,
		borderColor: colors.border,
		borderRadius: sizes.s16,
	},
	borderBottom: {
		borderBottomWidth: sizes.s1,
		borderBottomColor: colors.divider,
	},
	borderTop: {
		borderTopWidth: sizes.s1,
		borderTopColor: colors.divider,
	},
	shadow3: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	shadow5: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	shadow10: {
		shadowColor: 'rgba(0, 0, 0, 0.08)',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,

		elevation: 10,
	},

	column_center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	row_start: {
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	row_end: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	row_center: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	row_between: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	row_around: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	row_evenly: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	row_wrap: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		overflow: 'hidden',
	},
	row_wrap_center: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		overflow: 'hidden',
		justifyContent: 'center',
		alignContent: 'center',
	},
	column: {
		flexDirection: 'column',
	},
	column_between: {
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	icon16: { width: sizes.s16, height: sizes.s16 },
	icon16_radius: { width: sizes.s16, height: sizes.s16, borderRadius: sizes.s16 },
	icon18: { width: sizes.s18, height: sizes.s18 },
	icon20: { width: sizes.s20, height: sizes.s20 },
	icon20_radius: { width: sizes.s20, height: sizes.s20, borderRadius: sizes.s20 },
	icon24: { width: sizes.s24, height: sizes.s24 },
	icon24_radius: { width: sizes.s24, height: sizes.s24, borderRadius: sizes.s24 },
	icon32: { width: sizes.s32, height: sizes.s32 },
	icon32_radius: { width: sizes.s32, height: sizes.s32, borderRadius: sizes.s32 },
	icon40: { width: sizes.s40, height: sizes.s40 },
	icon48: { width: sizes.s48, height: sizes.s48 },
	icon56: { width: sizes.s56, height: sizes.s56 },
	icon64: { width: sizes.s64, height: sizes.s64 },
	icon72: { width: sizes.s72, height: sizes.s72 },
	icon76: { width: sizes.s76, height: sizes.s76 },
	icon80: { width: sizes.s80, height: sizes.s80 },
	icon88: { width: sizes.s88, height: sizes.s88 },
	icon96: { width: sizes.s96, height: sizes.s96 },
	icon120: { width: sizes.s120, height: sizes.s120 },
	icon140: { width: sizes.s140, height: sizes.s140 },
	icon160: { width: sizes.s160, height: sizes.s160 },

	top4: { marginTop: sizes.s4 },
	left4: { marginLeft: sizes.s4 },
	right4: { marginRight: sizes.s4 },
	bottom4: { marginBottom: sizes.s4 },

	top6: { marginTop: sizes.s6 },
	left6: { marginLeft: sizes.s6 },
	right6: { marginRight: sizes.s6 },
	bottom6: { marginBottom: sizes.s6 },

	top8: { marginTop: sizes.s8 },
	left8: { marginLeft: sizes.s8 },
	right8: { marginRight: sizes.s8 },
	bottom8: { marginBottom: sizes.s8 },

	top10: { marginTop: sizes.s10 },
	left10: { marginLeft: sizes.s10 },
	right10: { marginRight: sizes.s10 },
	bottom10: { marginBottom: sizes.s10 },

	top12: { marginTop: sizes.s12 },
	left12: { marginLeft: sizes.s12 },
	right12: { marginRight: sizes.s12 },
	bottom12: { marginBottom: sizes.s12 },

	top16: { marginTop: sizes.s16 },
	left16: { marginLeft: sizes.s16 },
	right16: { marginRight: sizes.s16 },
	bottom16: { marginBottom: sizes.s16 },

	top24: { marginTop: sizes.s24 },
	left24: { marginLeft: sizes.s24 },
	right24: { marginRight: sizes.s24 },
	bottom24: { marginBottom: sizes.s24 },

	top32: { marginTop: sizes.s32 },
	left32: { marginLeft: sizes.s32 },
	right32: { marginRight: sizes.s32 },
	bottom32: { marginBottom: sizes.s32 },

	top40: { marginTop: sizes.s40 },
	left40: { marginLeft: sizes.s40 },
	right40: { marginRight: sizes.s40 },
	bottom40: { marginBottom: sizes.s40 },

	top48: { marginTop: sizes.s48 },
	left48: { marginLeft: sizes.s48 },
	right48: { marginRight: sizes.s48 },
	bottom48: { marginBottom: sizes.s48 },

	top64: { marginTop: sizes.s64 },
	left64: { marginLeft: sizes.s64 },
	right64: { marginRight: sizes.s64 },
	bottom64: { marginBottom: sizes.s64 },
	// padding
	p8: { padding: sizes.s8 },
	p10: { padding: sizes.s10 },
	p12: { padding: sizes.s12 },
	p14: { padding: sizes.s14 },
	p16: { padding: sizes.s16 },
	p20: { padding: sizes.s20 },
	p24: { padding: sizes.s24 },

	// padding horizontal
	ph8: { paddingHorizontal: sizes.s8 },
	ph10: { paddingHorizontal: sizes.s10 },
	ph12: { paddingHorizontal: sizes.s12 },
	ph14: { paddingHorizontal: sizes.s14 },
	ph16: { paddingHorizontal: sizes.s16 },
	ph20: { paddingHorizontal: sizes.s20 },
	ph24: { paddingHorizontal: sizes.s24 },

	// padding vertical
	pv8: { paddingVertical: sizes.s8 },
	pv10: { paddingVertical: sizes.s10 },
	pv12: { paddingVertical: sizes.s12 },
	pv14: { paddingVertical: sizes.s14 },
	pv16: { paddingVertical: sizes.s16 },
	pv20: { paddingVertical: sizes.s20 },
	pv24: { paddingVertical: sizes.s24 },

	// margin vertical
	mv8: { marginVertical: sizes.s8 },
	mv10: { marginVertical: sizes.s10 },
	mv12: { marginVertical: sizes.s12 },
	mv14: { marginVertical: sizes.s14 },
	mv16: { marginVertical: sizes.s16 },
	mv20: { marginVertical: sizes.s20 },
	mv24: { marginVertical: sizes.s24 },

	// margin horizontal
	mh8: { marginHorizontal: sizes.s8 },
	mh10: { marginHorizontal: sizes.s10 },
	mh12: { marginHorizontal: sizes.s12 },
	mh14: { marginHorizontal: sizes.s14 },
	mh16: { marginHorizontal: sizes.s16 },
	mh20: { marginHorizontal: sizes.s20 },
	mh24: { marginHorizontal: sizes.s24 },

	radius12: { borderRadius: sizes.s12 },
	radius16: { borderRadius: sizes.s16 },
	radius24: { borderRadius: sizes.s24 },

	// custom style for navigator
	imagePicker: {
		backgroundColor: colors.tranparent,
	},
});

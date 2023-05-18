/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { colors, screenWidth } from 'core/index';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const SkeletonView = ({ style }: any) => {
	const [animation] = useState(new Animated.Value(-100));

	useEffect(() => {
		startAnimation();
	}, []);

	const startAnimation = () => {
		Animated.loop(
			Animated.timing(animation, {
				toValue: screenWidth,
				duration: 1000,
				useNativeDriver: true,
			})
		).start();
	};

	return (
		<View style={[styles.container, style]}>
			<FastImage
				source={{
					uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ8NDQ0NDQ0NDw0NDQ8NDQ8NDQ0NFREWFhURFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDi0ZHxk3Ky0rLSsrNysrKy0rKzcrKysrKysrKystKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALQBGAMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAABAgMABAYFB//EABgQAQEBAQEAAAAAAAAAAAAAAAABAhES/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APz2HkLlTMacxkUzkMxXMBs5Vzls5VzBGzlXMbMUkUbMPI0hpFRmZqBanpSp6RU9I6V0ltFS2htXaOxU9JaU0loUlTp6SoFpKalopKSnpaCdJVKSgnSVSkqKSlp6WgSgaloAA1gepzFcwmYrmNOZ8xbMJmK5gh8xXMJmK5ihsw8gQ8VBkFhAAoloFqej1PSKnpLam0doqW0dq7R1RUtJ6PpLSKWkpqSihSU1LQLS09LQJSVSkoJ0tilJYKnS1SksQJS09LQKw1geqytlLKuWnNXKuUsLZEVyrlLKmVFIeEhoqGYOsA0lG0toF1U9U2qnqopNVHdU1UdVFS2jpXVR0KnpLVU0lpFLSU1JRQoVgAAogBaWmpaBaSqUtBOwtPS1FTpaeloFrDYwPU5VyjlTNac18q5qGarmgtmqZqOapKItKaVKU0qinW6TrdAbS2haW0G1U9UbUtVFLqpap9VLVFT0lqqaS0KnpOn0npAlLTUlFClGhQCswAAUS0ApaaloFpaalqKWlpqFAlYawPSZqmajmqZqsL5qmahmqZoL5qma581SVUWlN1GU3oFet1PregPaS0LSXQDanqtaTVFDVT1R1U9UC6qejapNIpNJ09JRSUlNS0ClNS0AAaUGoVgoBQo0KiloUSgFLTUKBQGsD70qkqEp5RlfNUzUJT5oOiU8qEp5VRaU3pGU0oK9bqfoOge0tpbotqhrSWhaS0BtT1RtJaihSWjaSgWkpqSilpKaloFoUaWgFAaWorFGhQAKNKDUohQClogAMzA+xKeVGU8oi0qkqEp5RF5TyoSnmgWlN1GUZQV63pP03QP6LaW0LVBtLaFpbQG0toWltFa0to2ktAKSjaW0C0tGltRQpaNKDUGCg1LRpQYtEKAUK1CgAUSgzBWB9SU8qMppURaU8qMp5QXlNKjKeVRWUepSj0Fet6T9B0FOl6TodA/QtJ1uga0vQ6HQa0trWltBrSUbSWihaW0aW0GpetQBgYAagwAFCjS1Falo0tBgYAAQYR3ymlSlPKIrKeVGU8oLSmlRlNKC3W6n1ugr6DqfW9AfrdJ0Oqp+t0nW6Buh0vWtAbS2haFoNaS0bSUGtLa1oA1oMCDMDCtQrAAUKNLQChRpaAANLQZgYR2SmlSlPKCsppUpTSgrKaVKU3QU6PU+t0FOh0nW6B+t0nW6B+t0nW6ofodL1ugNoWhaW0GtC1rS1BqWtQFEGABBmBgYAAKNLQChRpaAUKNLQBmZUdMponDRBSU0qcppQUlHqco9BTrdJ1ugfrdJ1ugfrdL1ugfrdL1ugbrdKwo9C0OhQah1qUGBgAWBgZmYGoVgAKFGloBQo0tAArAAVmrKjogxmQNBjMAizALMwMIMAizCsLMDMzAAMwAVmAAosAMzAzCwoBWYQKVmAtCswFBmAKzMqP/Z',
				}}
				style={StyleSheet.absoluteFill}
				resizeMode="cover"
			/>
			<Animated.View
				style={[
					styles.skeleton,
					{
						transform: [{ translateX: animation }],
					},
				]}>
				<LinearGradient
					style={{ flex: 1 }}
					colors={[
						'rgba(0, 0, 0, 0.01)',
						'rgba(0, 0, 0, 0.05)',
						'rgba(0, 0, 0, 0.1)',
						'rgba(0, 0, 0, 0.15)',
						'rgba(0, 0, 0, 0.2)',
						'rgba(0, 0, 0, 0.25)',
						'rgba(0, 0, 0, 0.3)',
					]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
				/>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.backgroundApp,
	},
	skeleton: {
		backgroundColor: colors.gradient,
		height: '100%',
		width: 70,
		opacity: 0.7,
	},
});

export default SkeletonView;

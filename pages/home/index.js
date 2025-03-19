import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer, SplitText } from 'gsap/all'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'


function init() {
	gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin)
	console.log("DrawSVGPlugin зарегистрирован: ", gsap.plugins.DrawSVGPlugin !== undefined);

	const adaptive = gsap.matchMedia()

	// Menu burger

	const headerLinks = document.querySelectorAll('.header_link-wrapper')
	const burgerBtn = document.querySelector('.header_burger')

	headerLinks.forEach(link => {
		link.addEventListener('click', () => {
			burgerBtn.click()
		})
	})

	// Desktop
	adaptive.add('(min-width: 480px)', () => {
		// hero
		const heroTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.hero_camera',
				start: 'clamp(top top)',
				end: 'clamp(bottom-=60% bottom)',
				scrub: 1,
			},
		})
		heroTl.set('.hero_track', {
			height: '68em',
		})
		heroTl.set('.hero_content', {
			height: '47em',
		})
		heroTl.to(
			'.hero_track',
			{
				height: '40em',
			},
			0
		)
		heroTl.to(
			'.hero_content',
			{
				height: '31.625em',
			},
			0
		)

		// intro

		const introTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.section_into',
				start: 'top top',
				end: 'bottom-=20% bottom',
				scrub: 2,
			},
		})
		introTl.to('.intro_gallery', {
			delay: 1,
			width: '33.33333333333333vw',
			duration: 2,
		})
		introTl.to('.intro_heading', {
			y: '-50%',
			duration: 2,
		})
		introTl.to('.intro_bg-overlay', {
			backgroundColor: 'rgba(0, 0, 0, 0)',
			duration: 0.5,
		})
		introTl.to(
			'.intro_heading',
			{
				delay: 1,
				y: '-100%',
				duration: 2,
			},
			'<'
		)
		introTl.to(
			'.intro_gallery',
			{
				width: '0vw',
				duration: 2,
			},
			'<'
		)
		introTl.to(
			'.intro_image.is--fixed',
			{
				// x: '100%',
				width: '0vw',
				duration: 2,
			},
			'<'
		)
		introTl.to(
			'.intro_text',
			{
				y: 0,
				duration: 2,
			},
			'<'
		)

		// services 01
		const point01Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.services_point-01',
				start: 'top+=10% top',
				end: 'bottom top',
				onLeave: function () {
					gsap.to('.services_01', {
						opacity: 0,
						duration: 0.5,
					})
				},
				onEnterBack: function () {
					gsap.to('.services_01', {
						opacity: 1,
						duration: 0.5,
					})
				},
			},
		})
		point01Tl.to('.services_overlay', {
			backgroundColor: 'rgba(0, 0, 0, 0.3)',
			duration: 0.5,
		})
		point01Tl.to(
			'.services_01',
			{
				opacity: 1,
				duration: 0.5,
			},
			'<'
		)
		const path01 = gsap.timeline({
			scrollTrigger: {
				trigger: '.services_point-01',
				start: 'top+=10% top',
				end: 'bottom top',
				onLeave: function () {
					gsap.to(
						'.path-01', // Заменить на селектор твоей SVG фигуры
						{
							fill: 'transparent', // Рисование от начала до конца
							duration: 1, // Время анимации
						}
					)
					gsap.to(
						'.service_accent-01',
						{
							opacity: 0,
							duration: 1,
						},
						'<'
					)
					gsap.to(
						'.services_01-flex',
						{
							y: '100%',
							duration: 1,
						},
						'<'
					)
				},
				onEnterBack: function () {
					gsap.to(
						'.path-01', // Заменить на селектор твоей SVG фигуры
						{
							fill: '#fff', // Рисование от начала до конца
							duration: 1, // Время анимации
						}
					)
					gsap.to(
						'.service_accent-01',
						{
							opacity: 1,
							duration: 1,
						},
						'<'
					)
					gsap.to(
						'.services_01-flex',
						{
							y: '0%',
							duration: 1,
						},
						'<'
					)
				},
			},
		})
		path01.to('.path-01', {
			fill: '#fff',
			duration: 1,
		})
		path01.to(
			'.service_accent-01',
			{
				opacity: 1,
				duration: 1,
			},
			'<'
		)
		// services 02

		const point02 = gsap.timeline({
			scrollTrigger: {
				trigger: '.services_point-02',
				start: 'top top',
				end: 'bottom top',
				scrub: 1,
				onEnter: function () {
					// Когда триггер активируется при скролле вниз
					gsap.to('.services_02', {
						opacity: 1,
						duration: 1,
					})
					gsap.to('.services_02-flex', {
						y: '0%',
						duration: 1,
					})
				},
				onLeave: function () {
					// Когда уходим из триггера (скроллим вниз)
					gsap.to('.services_02-flex', {
						x: '100%',
						duration: 1,
					})
					gsap.to(
						'.services_02',
						{
							opacity: 0,
							duration: 1,
						},
						'<'
					)
				},
				onEnterBack: function () {
					// Когда возвращаемся к триггеру при скроллинге вверх
					gsap.to('.services_02-flex', {
						x: '0%',
						duration: 1,
					})
					gsap.to(
						'.services_02',
						{
							opacity: 1,
							duration: 1,
						},
						'<'
					)
				},
				onLeaveBack: function () {
					// Когда уходим с триггера при скроллинге вверх (элемент исчезает)
					gsap.to('.services_02-flex', {
						y: '100%',
						duration: 1,
					})
					gsap.to(
						'.services_02',
						{
							opacity: 0,
							duration: 1,
						},
						'<'
					)
				},
			},
		})

		const path02 = gsap.timeline({
			scrollTrigger: {
				trigger: '.services_point-02',
				start: 'top top',
				end: 'bottom top',
			},
		})
		path02.to(
			'.path-02', // Заменить на селектор твоей SVG фигуры
			{
				fill: '#fff', // Рисование от начала до конца
				duration: 1, // Время анимации
			}
		)
		path02.to(
			'.service_accent-02',
			{
				opacity: 1,
				duration: 1,
			},
			'<'
		)

		// service 03

		const point03 = gsap.timeline({
			scrollTrigger: {
				trigger: '.services_point-03',
				start: 'top top',
				end: 'bottom top',
				scrub: 1,
				onEnter: function () {
					// Когда триггер активируется при скролле вниз
					gsap.to('.services_03', {
						opacity: 1,
						duration: 1,
					})
					gsap.to(
						'.services_03-flex',
						{
							y: '0%',
							x: '0%',
							duration: 1,
						},
						'<'
					)
				},
				onLeave: function () {
					// Когда уходим из триггера (скроллим вниз)
					gsap.to('.services_03', {
						opacity: 0,
						duration: 1,
					})
					gsap.to(
						'.services_03-flex',
						{
							y: '-50%',
							x: '-100%',
							duration: 1,
						},
						'<'
					)
				},
				onEnterBack: function () {
					// Когда возвращаемся к триггеру при скроллинге вверх
					gsap.to('.services_03', {
						opacity: 1,
						duration: 1,
					})
					gsap.to(
						'.services_03-flex',
						{
							y: '0%',
							x: '0%',
							duration: 1,
						},
						'<'
					)
				},
				onLeaveBack: function () {
					// Когда уходим с триггера при скроллинге вверх (элемент исчезает)
					gsap.to('.services_03', {
						opacity: 0,
						duration: 1,
					})
					gsap.to(
						'.services_03-flex',
						{
							y: '50%',
							x: '-100%',
							duration: 1,
						},
						'<'
					)
				},
			},
		})
		const path03 = gsap.timeline({
			scrollTrigger: {
				trigger: '.services_point-03',
				start: 'top top',
				end: 'bottom top',
			},
		})
		path03.to(
			'.path-03', // Заменить на селектор твоей SVG фигуры
			{
				fill: '#fff', // Рисование от начала до конца
				duration: 1, // Время анимации
			}
		)
		path03.to(
			'.service_accent-03',
			{
				opacity: 1,
				duration: 1,
			},
			'<'
		)

		// services 04
			
			const point04 = gsap.timeline({
				scrollTrigger: {
					trigger: '.services_point-04',
					start: 'top top',
					end: 'bottom top',
					scrub: 1,
					onEnter: function () {
						// Когда триггер активируется при скролле вниз
						gsap.to('.services_04', {
							x: '0%',
							y: '0%',
							opacity: 1,
							duration: 1,
						})
						gsap.to('.services_04-flex', {
							x: '0%',
							y: '0%',
							opacity: 1,
							duration: 1,
						})
						// gsap.fromTo(
						// 	'.services_04__cta',
						// 	{
						// 		opacity: 0,
						// 		x: '-100%',
						// 	},
						// 	{
						// 		opacity: 1,
						// 		x: '0%',
						// 		duration: 1,
						// 		delay: 1,
						// 	}
						// )
						gsap.to(
							'.services_04-cta-title',
							{
								textShadow: '0 0 1em #fff',
								scale: 1.1,
								repeat: -1,
								yoyo: true,
								duration: 0.8,
							}
						)
					},
					onLeave: function () {
						// Когда уходим из триггера (скроллим вниз)
						gsap.to('.services_04', {
							x: '50%',
							y: '50%',
							opacity: 0,
							duration: 1,
						})
					},
					onEnterBack: function () {
						// Когда возвращаемся к триггеру при скроллинге вверх
						gsap.to('.services_04', {
							x: '0%',
							y: '0%',
							opacity: 1,
							duration: 1,
						})
						gsap.to(
							'.services_04-flex',
							{
								x: '0%',
								y: '0%',
								opacity: 1,
								duration: 1,
							},
							'<'
						)
						// gsap.fromTo(
						// 	'.services_04__cta',
						// 	{
						// 		opacity: 0,
						// 		x: '-100%',
						// 	},
						// 	{
						// 		opacity: 1,
						// 		x: '0%',
						// 		duration: 1,
						// 		delay: 2,
						// 	}
						// )
					},
					onLeaveBack: function () {
						// Когда уходим с триггера при скроллинге вверх (элемент исчезает)
						gsap.to('.services_04', {
							x: '50%',
							y: '50%',
							opacity: 0,
							duration: 1,
						})
					},
				},
			})
			const phone04 = gsap.timeline({
				scrollTrigger: {
					trigger: '.services_point-04',
					start: 'top top',
					end: 'bottom top',
				},
			})
			phone04.to('.services_04-phone-wrapp', {
				opacity: 1,
				duration: 1,
			})
			





		// Определяем все элементы с классом phone-image
		const phoneImages = document.querySelectorAll('.phone-image')

		// Определяем триггеры
		const phoneTrigger01 = document.querySelector('[phone-bg="01"]')
		const phoneTrigger02 = document.querySelector('[phone-bg="02"]')
		const phoneTrigger03 = document.querySelector('[phone-bg="03"]')

		// Функция для сдвига фонов
		function shiftBackgrounds(offsetX) {
			gsap.to(phoneImages, { x: offsetX, duration: 0.5 })
		}

		// Обработчики ховера
		phoneTrigger01.addEventListener('mouseenter', () =>
			shiftBackgrounds('100%')
		) // Ничего не происходит, картинки сдвинуты на 100%
		phoneTrigger02.addEventListener('mouseenter', () => shiftBackgrounds('0%')) // Все на x: 0
		phoneTrigger03.addEventListener('mouseenter', () =>
			shiftBackgrounds('-100%')
		) // Все на x: -100%

		// Возврат при уходе курсора с триггеров — все на x: 100%
		;[phoneTrigger01, phoneTrigger02, phoneTrigger03].forEach(trigger => {
			trigger.addEventListener('mouseleave', () => shiftBackgrounds('100%'))
		})

		// При загрузке страницы все картинки сдвинуты на 100%
		shiftBackgrounds('100%')

		// service 05

		const point05 = gsap.timeline({
			scrollTrigger: {
				trigger: '.services_point-05',
				start: 'top top',
				end: 'bottom top',
				scrub: 1,
				onEnter: function () {
					// Когда триггер активируется при скролле вниз
					gsap.to('.services_05', {
						opacity: 1,
						duration: 1,
					})
					gsap.to(
						'.services_05-flex',
						{
							x: '0%',
							y: '0%',
							duration: 1,
						},
						'<'
					)
				},
				onLeaveBack: function () {
					// Когда уходим с триггера при скроллинге вверх (элемент исчезает)
					gsap.to('.services_05', {
						opacity: 0,
						duration: 1,
					})
					gsap.to(
						'.services_05-flex',
						{
							x: '-100%',
							y: '-100%',
							duration: 1,
						},
						'<'
					)
				},
			},
		})
		const path05 = gsap.timeline({
			scrollTrigger: {
				trigger: '.services_point-05',
				start: 'top top',
				end: 'bottom top',
			},
		})
		path03.to(
			'.path-05', // Заменить на селектор твоей SVG фигуры
			{
				fill: '#fff', // Рисование от начала до конца
				duration: 1, // Время анимации
			}
		)
		path03.to(
			'.service_accent-05',
			{
				opacity: 1,
				duration: 1,
			},
			'<'
		)

		// Features section

		// section mind
		const mindTitle = document.querySelector('.mind_title')
		const mindSplit = new SplitText(mindTitle, { type: 'words' })
		const mindTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.mind_track',
				start: 'top+=10% top',
				end: 'bottom-=20% bottom',
				scrub: 2,
			},
		})
		mindSplit.words.forEach(word => {
			mindTl.to(word, {
				color: '#ffffff',
				duration: 2,
			})
		})

		// Frames

		const framesTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.section_frames',
				start: 'top center',
				end: 'bottom center',
				onEnter: function () {
					gsap.to('.frames_image', {
						x: '0%',
						right: '-8em',
						duration: 1,
					})
					gsap.to('.frames_blach_wrapper.is--04', {
						opacity: 1,
						duration: 0.8,
					})
				},
				onLeave: function () {
					gsap.to('.frames_image', {
						x: '100%',
						right: '-20%',
						left: 'auto',
						duration: 1,
					})
					gsap.to('.frames_blach_wrapper.is--04', {
						opacity: 0,
						duration: 0.8,
					})
				},
				onEnterBack: function () {
					gsap.to('.frames_image', {
						x: '0%',
						right: 'auto',
						left: '0%',
						duration: 1,
					})
					gsap.to('.frames_blach_wrapper.is--04', {
						opacity: 1,
						duration: 0.8,
					})
				},
				onLeaveBack: function () {
					gsap.to('.frames_image', {
						x: '100%',
						right: '-20%',
						left: 'auto',
						duration: 1,
					})
					gsap.to('.frames_blach_wrapper.is--04', {
						opacity: 0,
						duration: 0.8,
					})
				},
			},
		})
		framesTl.to('.frames_image', {
			x: '0%',
			right: 'auto',
			left: '0%',
			duration: 1,
		})

		// frame 02

		const frame02 = gsap.timeline({
			scrollTrigger: {
				trigger: '.frames-box-01',
				start: 'top center',
				end: 'bottom bottom',
				scrub: 1,
				onEnter: function () {
					// Когда скролл вниз - активируется вторая сцена
					gsap.to('.frame-01', { opacity: 0, duration: 1 })
					gsap.to('.frame-02', { opacity: 1, duration: 1 })
					gsap.to('.frame-03', { opacity: 0, duration: 1 })
					gsap.to('.frame-04', { opacity: 0, duration: 1 })
				},
				onLeaveBack: function () {
					// Когда скролл вверх - все возвращается в исходное состояние
					gsap.to('.frame-01', { opacity: 1, duration: 1 })
					gsap.to('.frame-02', { opacity: 0, duration: 1 })
					gsap.to('.frame-03', { opacity: 0, duration: 1 })
					gsap.to('.frame-04', { opacity: 0, duration: 1 })
				},
			},
		})

		// frame 03

		const frame03 = gsap.timeline({
			scrollTrigger: {
				trigger: '.frames-box-02',
				start: 'top center',
				end: 'bottom bottom',
				onEnter: function () {
					// Когда скролл вниз - активируется вторая сцена
					gsap.to('.frame-01', { opacity: 0, duration: 0.8 })
					gsap.to('.frame-02', { opacity: 0, duration: 0.8 })
					gsap.to('.frame-03', { opacity: 1, duration: 0.8 })
					gsap.to('.frame-04', { opacity: 0, duration: 0.8 })
				},
				onLeaveBack: function () {
					// Когда скролл вверх - все возвращается в исходное состояние
					gsap.to('.frame-01', { opacity: 0, duration: 0.8 })
					gsap.to('.frame-02', { opacity: 1, duration: 0.8 })
					gsap.to('.frame-03', { opacity: 0, duration: 0.8 })
					gsap.to('.frame-04', { opacity: 0, duration: 0.8 })
				},
			},
		})

		// frame 04

		const frame04 = gsap.timeline({
			scrollTrigger: {
				trigger: '.frames-box-03',
				start: 'top center',
				end: 'bottom bottom',
				onEnter: function () {
					// Когда скролл вниз - активируется вторая сцена
					gsap.to('.frame-01', { opacity: 0, duration: 0.8 })
					gsap.to('.frame-02', { opacity: 0, duration: 0.8 })
					gsap.to('.frame-03', { opacity: 0, duration: 0.8 })
					gsap.to('.frame-04', { opacity: 1, duration: 0.8 })
				},
				onLeaveBack: function () {
					// Когда скролл вверх - все возвращается в исходное состояние
					gsap.to('.frame-01', { opacity: 0, duration: 0.8 })
					gsap.to('.frame-02', { opacity: 0, duration: 0.8 })
					gsap.to('.frame-03', { opacity: 1, duration: 0.8 })
					gsap.to('.frame-04', { opacity: 0, duration: 0.8 })
				},
			},
		})

		// showreel

		// Получаем видео элемент
		const video = document.querySelector('#bg-video')
		const showreel = gsap.timeline({
			scrollTrigger: {
				trigger: '.section_showreel', // Когда эта секция появится
				start: 'top center', // Когда секция в центре экрана
				end: 'bottom top', // Когда уходит за пределы видимости
				onEnter: () => video.play(), // Воспроизвести видео при входе
				onLeave: () => video.pause(), // Пауза видео, когда секция уходит
				onEnterBack: () => video.play(), // Воспроизвести видео при скролле назад
				onLeaveBack: () => video.pause(), // Пауза видео при выходе назад
			},
		})

		// about

		const aboutTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.section_about',
				start: 'top 80%',
				end: 'bottom bottom',
			},
		})
		aboutTl.from('.about_card-image', {
			scale: 1.1,
			duration: 1,
			stagger: 0.3,
		})

		// cta

		const ctaTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.cta_track',
				start: 'top center',
				end: 'bottom bottom',
				scrub: 2,
			},
		})
		ctaTl.to(
			'[da="g-01"]',
			{
				y: '0%',
				duration: 2,
			},
			0
		)
		ctaTl.to(
			'[da="g-02"]',
			{
				y: '0%',
				duration: 2,
			},
			0
		)
		ctaTl.to(
			'[da="g-03"]',
			{
				y: '0%',
				duration: 2,
			},
			0
		)
	})
	adaptive.add('(max-width: 479px)', () => {
		gsap.registerPlugin(Observer)
		// Начальные стили
		// // hero
		const heroTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.hero_camera',
				start: 'clamp(top top)',
				end: 'clamp(bottom-=60% bottom)',
				scrub: true,
				invalidateOnRefresh: false,
			},
		})
		heroTl.set('.hero_track', {
			height: '63.125em',
		})
		heroTl.set('.hero_content', {
			height: '45.375em',
		})
		heroTl.to(
			'.hero_track',
			{
				height: '41.875em',
			},
			0
		)
		heroTl.to(
			'.hero_content',
			{
				height: '31.625em',
			},
			0
		)

		// // intro

		const introTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.section_into',
				start: 'top+=20% top',
				end: 'bottom bottom',
				scrub: true,
				invalidateOnRefresh: false,
			},
		})
		introTl.to('[intro="03"]', {
			width: '0%',
			duration: 1,
		})
		introTl.to('[intro="02"]', {
			width: '0%',
			duration: 1,
		})
		introTl.to('.intro_gallery', {
			width: '0%',
		})
		introTl.to(
			'.intro_title',
			{
				width: '100%',
			},
			'<'
		)
		introTl.to('.intro_bg-overlay', {
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
			duration: 0.5,
		})
		introTl.to(
			'.intro_heading',
			{
				opacity: '100%',
			},
			'<'
		)
		introTl.to(
			'.intro_text',
			{
				opacity: '100%',
			},
			'<'
		)

		// services 01
		const point01Tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.services_point-01',
				start: 'top+=10% top',
				end: 'bottom top',
				scrub: true,
				invalidateOnRefresh: false,
				onLeave: function () {
					gsap.to('.services_01', {
						opacity: 0,
						duration: 0.5,
					})
				},
				onEnterBack: function () {
					gsap.to('.services_01', {
						opacity: 1,
						duration: 0.5,
					})
				},
			},
		})
		point01Tl.to('.services_overlay', {
			backgroundColor: 'rgba(0, 0, 0, 0.3)',
			duration: 0.5,
		})
		point01Tl.to(
			'.services_01',
			{
				opacity: 1,
				duration: 0.5,
			},
			'<'
		)
		const path01 = gsap.timeline({
			scrollTrigger: {
				trigger: '.services_point-01',
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				invalidateOnRefresh: false,
				onLeave: function () {
					gsap.to(
						'.path-01', // Заменить на селектор твоей SVG фигуры
						{
							fill: 'transparent', // Рисование от начала до конца
							duration: 1, // Время анимации
						}
					)
					gsap.to(
						'.service_accent-01',
						{
							opacity: 0,
							duration: 1,
						},
						'<'
					)
					gsap.to(
						'.services_01-flex',
						{
							y: '100%',
							duration: 1,
						},
						'<'
					)
				},
				onEnterBack: function () {
					gsap.to(
						'.path-01', // Заменить на селектор твоей SVG фигуры
						{
							fill: '#fff', // Рисование от начала до конца
							duration: 1, // Время анимации
						}
					)
					gsap.to(
						'.service_accent-01',
						{
							opacity: 1,
							duration: 1,
						},
						'<'
					)
					gsap.to(
						'.services_01-flex',
						{
							y: '0%',
							duration: 1,
						},
						'<'
					)
				},
			},
		})
		path01.to(
			'.path-01', // Заменить на селектор твоей SVG фигуры
			{
				fill: '#fff', // Рисование от начала до конца
				duration: 1, // Время анимации
			}
		)
		path01.to(
			'.service_accent-01',
			{
				opacity: 1,
				duration: 1,
			},
			'<'
		)
		// services 02

		const point02 = gsap.timeline({
			scrollTrigger: {
				trigger: '.services_point-02',
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				invalidateOnRefresh: false,
				onEnter: function () {
					// Когда триггер активируется при скролле вниз
					gsap.to('.services_02', {
						opacity: 1,
						duration: 1,
					})
					gsap.to('.services_02-flex', {
						y: '0%',
						duration: 1,
					})
				},
				onLeave: function () {
					// Когда уходим из триггера (скроллим вниз)
					gsap.to('.services_02-flex', {
						y: '-100%',
						duration: 1,
					})
					gsap.to(
						'.services_02',
						{
							opacity: 0,
							duration: 1,
						},
						'<'
					)
				},
				onEnterBack: function () {
					// Когда возвращаемся к триггеру при скроллинге вверх
					gsap.to('.services_02-flex', {
						y: '0%',
						duration: 1,
					})
					gsap.to(
						'.services_02',
						{
							opacity: 1,
							duration: 1,
						},
						'<'
					)
				},
				onLeaveBack: function () {
					// Когда уходим с триггера при скроллинге вверх (элемент исчезает)
					gsap.to('.services_02-flex', {
						y: '-100%',
						duration: 1,
					})
					gsap.to(
						'.services_02',
						{
							opacity: 0,
							duration: 1,
						},
						'<'
					)
				},
			},
		})

		const path02 = gsap.timeline({
			scrollTrigger: {
				trigger: '.services_point-02',
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				invalidateOnRefresh: false,
			},
		})
		path02.to(
			'.path-02', // Заменить на селектор твоей SVG фигуры
			{
				fill: '#fff', // Рисование от начала до конца
				duration: 1, // Время анимации
			}
		)
		path02.to(
			'.service_accent-02',
			{
				opacity: 1,
				duration: 1,
			},
			'<'
		)

		// service 03

		const point03 = gsap.timeline({
			scrollTrigger: {
				trigger: '.services_point-03',
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				invalidateOnRefresh: false,
				onEnter: function () {
					// Когда триггер активируется при скролле вниз
					gsap.to('.services_03', {
						opacity: 1,
						duration: 1,
					})
					gsap.to(
						'.services_03-flex',
						{
							y: '0%',
							duration: 1,
						},
						'<'
					)
				},
				onLeave: function () {
					// Когда уходим из триггера (скроллим вниз)
					gsap.to('.services_03', {
						opacity: 0,
						duration: 1,
					})
					gsap.to(
						'.services_03-flex',
						{
							y: '100%',
							duration: 1,
						},
						'<'
					)
				},
				onEnterBack: function () {
					// Когда возвращаемся к триггеру при скроллинге вверх
					gsap.to('.services_03', {
						opacity: 1,
						duration: 1,
					})
					gsap.to(
						'.services_03-flex',
						{
							y: '0%',
							duration: 1,
						},
						'<'
					)
				},
				onLeaveBack: function () {
					// Когда уходим с триггера при скроллинге вверх (элемент исчезает)
					gsap.to('.services_03', {
						opacity: 0,
						duration: 1,
					})
					gsap.to(
						'.services_03-flex',
						{
							y: '100%',
							duration: 1,
						},
						'<'
					)
				},
			},
		})
		const path03 = gsap.timeline({
			scrollTrigger: {
				trigger: '.services_point-03',
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				invalidateOnRefresh: false,
			},
		})
		path03.to(
			'.path-03', // Заменить на селектор твоей SVG фигуры
			{
				fill: '#fff', // Рисование от начала до конца
				duration: 1, // Время анимации
			}
		)
		path03.to(
			'.service_accent-03',
			{
				opacity: 1,
				duration: 1,
			},
			'<'
		)

		// services 04
		adaptive.add('(max-width: 479px)', () => {
			
			const point04 = gsap.timeline({
				scrollTrigger: {
					trigger: '.services_point-04',
					start: 'top top',
					end: 'bottom-=50% top',
					scrub: true,
					invalidateOnRefresh: false,
					onEnter: function () {
						// Когда триггер активируется при скролле вниз
						gsap.to('.services_04', {
							opacity: 1,
							duration: 1,
						})
						gsap.to('.services_04-flex', {
							opacity: 1,
							y: '0%',
							duration: 1,
						})
	
					},
					onLeave: function () {
						// Когда уходим из триггера (скроллим вниз)
						gsap.to('.services_04-flex', {
							opacity: 0,
							x: '50%',
							y: '-50%',
							duration: 1,
						})
					},
					onEnterBack: function () {
						// Когда возвращаемся к триггеру при скроллинге вверх
						gsap.to('.services_04-flex', {
							x: '0%',
							y: '0%',
							opacity: 1,
							duration: 1,
						})
	
					},
					onLeaveBack: function () {
						// Когда уходим с триггера при скроллинге вверх (элемент исчезает)
						gsap.to('.services_04-flex', {
							y: '-100%',
							opacity: 0,
							duration: 1,
						})
					},
				},
			})
	
			const phone04 = gsap.timeline({
				scrollTrigger: {
					trigger: '.services_point-04',
					start: 'top+=50% top',
					end: 'bottom top',
					scrub: true,
					// invalidateOnRefresh: false,
					onEnter: function () {
						// Когда триггер активируется при скролле вниз
						gsap.to('.services_04-phone-wrapp', {
							opacity: 1,
							y: '0%',
							x: '-50%',
							duration: 1,
						})
						// gsap.fromTo(
						// 	'.services_04__cta',
						// 	{
						// 		opacity: 0,
						// 		x: '-100%',
						// 	},
						// 	{
						// 		opacity: 1,
						// 		x: '0%',
						// 		duration: 1,
						// 		delay: 2,
						// 	}
						// )
						gsap.to(
							'.services_04-cta-title',
							{
								textShadow: '0 0 1em #fff',
								scale: 1.1,
								repeat: -1,
								yoyo: true,
								duration: 0.8,
							}
						)
					},
					onLeave: function () {
						// Когда уходим из триггера (скроллим вниз)
						gsap.to('.services_04-phone-wrapp', {
							opacity: 0,
							x: '100%',
							y: '50%',
							duration: 1,
						})
						// gsap.fromTo(
						// 	'.services_04__cta',
						// 	{
						// 		opacity: 0,
						// 		x: '-100%',
						// 	},
						// 	{
						// 		opacity: 1,
						// 		x: '0%',
						// 		duration: 1,
						// 		delay: 2,
						// 	}
						// )
					},
					onEnterBack: function () {
						// Когда возвращаемся к триггеру при скроллинге вверх
						gsap.to('.services_04-phone-wrapp', {
							x: '-50%',
							y: '0%',
							opacity: 1,
							duration: 1,
						})
	
					},
					onLeaveBack: function () {
						// Когда уходим с триггера при скроллинге вверх (элемент исчезает)
						gsap.to('.services_04-phone-wrapp', {
							y: '50%',
							x: '-100%',
							opacity: 0,
							duration: 1,
						})
					},
				},
			})

		})


		// Определяем все элементы с классом phone-image
		const phoneImages = document.querySelectorAll('.phone-image')

		// Определяем триггеры
		const phoneTrigger01 = document.querySelector('[phone-bg="01"]')
		const phoneTrigger02 = document.querySelector('[phone-bg="02"]')
		const phoneTrigger03 = document.querySelector('[phone-bg="03"]')

		// Функция для сдвига фонов
		function shiftBackgrounds(offsetX) {
			gsap.to(phoneImages, { x: offsetX, duration: 0.5 })
		}

		// Обработчики ховера
		phoneTrigger01.addEventListener('click', () => shiftBackgrounds('100%')) // Ничего не происходит, картинки сдвинуты на 100%
		phoneTrigger02.addEventListener('click', () => shiftBackgrounds('0%')) // Все на x: 0
		phoneTrigger03.addEventListener('click', () => shiftBackgrounds('-100%')) // Все на x: -100%
		// При загрузке страницы все картинки сдвинуты на 100%
		shiftBackgrounds('100%')

		// service 05

		const point05 = gsap.timeline({
			scrollTrigger: {
				trigger: '.services_point-05',
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				invalidateOnRefresh: false,
				onEnter: function () {
					// Когда триггер активируется при скролле вниз
					gsap.to('.services_05', {
						opacity: 1,
						duration: 1,
					})
					gsap.to(
						'.services_05-flex',
						{
							x: '0%',
							y: '0%',
							duration: 1,
						},
						'<'
					)
				},
				onLeaveBack: function () {
					// Когда уходим с триггера при скроллинге вверх (элемент исчезает)
					gsap.to('.services_05', {
						opacity: 0,
						duration: 1,
					})
					gsap.to(
						'.services_05-flex',
						{
							x: '50%',
							y: '100%',
							duration: 1,
						},
						'<'
					)
				},
			},
		})

		// section mind
		const mindTitle = document.querySelector('.mind_title')
		const mindSplit = new SplitText(mindTitle, { type: 'words' })
		const mindTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.mind_track',
				start: 'top+=10% top',
				end: 'bottom-=20% bottom',
				scrub: true,
				invalidateOnRefresh: false,
			},
		})
		mindSplit.words.forEach(word => {
			mindTl.to(word, {
				color: '#ffffff',
				duration: 2,
			})
		})

		// frames

		const framesTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.section_frames',
				start: 'top center',
				end: 'bottom bottom',
				onEnter: function () {
					gsap.to('.frames_image', {
						x: '50%',
						y: 0,
						rotation: 0,
						duration: 1,
					})
				},
				onLeave: function () {
					gsap.to('.frames_image', {
						y: '-100%',
						duration: 1,
					})
					gsap.to('.frames_blach_wrapper.is--04', {
						opacity: 0,
						duration: 0.8,
					})
				},
				onEnterBack: function () {
					gsap.to('.frames_image', {
						y: '0%',
						duration: 1,
					})
					gsap.to('.frames_blach_wrapper.is--04', {
						opacity: 1,
						duration: 0.8,
					})
				},
				onLeaveBack: function () {
					gsap.to('.frames_image', {
						x: '200%',
						y: '-7.25em',
						rotation: '31deg',
						duration: 1,
					})
					gsap.to('.frames_blach_wrapper.is--04', {
						opacity: 0,
						duration: 0.8,
					})
				},
			},
		})

		// frames 01

		const frames01 = gsap.timeline({
			scrollTrigger: {
				trigger: '.frames_point-01',
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				invalidateOnRefresh: false,
				onLeave: function () {
					// Когда уходим из триггера (скроллим вниз)
					gsap.to('[data-frame="01"]', {
						x: '-200%',
						opacity: 0,
						duration: 1,
					})
					gsap.to('.frame-01', { opacity: 0, duration: 1 })
					gsap.to('.frame-02', { opacity: 1, duration: 1 })
					gsap.to('.frame-03', { opacity: 0, duration: 1 })
					gsap.to('.frame-04', { opacity: 0, duration: 1 })
				},
				onEnterBack: function () {
					// Когда возвращаемся к триггеру при скроллинге вверх
					gsap.to('[data-frame="01"]', {
						x: '0%',
						opacity: 1,
						duration: 1,
					})
					gsap.to('.frame-01', { opacity: 1, duration: 1 })
					gsap.to('.frame-02', { opacity: 0, duration: 1 })
					gsap.to('.frame-03', { opacity: 0, duration: 1 })
					gsap.to('.frame-04', { opacity: 0, duration: 1 })
				},
			},
		})

		// frames 02

		const frames02 = gsap.timeline({
			scrollTrigger: {
				trigger: '.frames_point-02',
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				invalidateOnRefresh: false,
				onEnter: function () {
					// Когда триггер активируется при скролле вниз
					gsap.to('[data-frame="02"]', {
						x: '0%',
						y: '0%',
						opacity: 1,
						duration: 1,
					})
					gsap.to('.frame-01', { opacity: 0, duration: 1 })
					gsap.to('.frame-02', { opacity: 1, duration: 1 })
					gsap.to('.frame-03', { opacity: 0, duration: 1 })
					gsap.to('.frame-04', { opacity: 0, duration: 1 })
				},
				onLeave: function () {
					// Когда уходим из триггера (скроллим вниз)
					gsap.to('[data-frame="02"]', {
						x: '-100%',
						opacity: 0,
						duration: 1,
					})
					gsap.to('.frame-01', { opacity: 0, duration: 1 })
					gsap.to('.frame-02', { opacity: 0, duration: 1 })
					gsap.to('.frame-03', { opacity: 1, duration: 1 })
					gsap.to('.frame-04', { opacity: 0, duration: 1 })
				},
				onEnterBack: function () {
					// Когда возвращаемся к триггеру при скроллинге вверх
					gsap.to('[data-frame="02"]', {
						x: '0%',
						y: '0%',
						opacity: 1,
						duration: 1,
					})
					gsap.to('.frame-01', { opacity: 0, duration: 1 })
					gsap.to('.frame-02', { opacity: 1, duration: 1 })
					gsap.to('.frame-03', { opacity: 0, duration: 1 })
					gsap.to('.frame-04', { opacity: 0, duration: 1 })
				},
				onLeaveBack: function () {
					// Когда уходим с триггера при скроллинге вверх (элемент исчезает)
					gsap.to('[data-frame="02"]', {
						x: '100%',
						y: '100%',
						opacity: 1,
						duration: 1,
					})
					gsap.to('.frame-01', { opacity: 1, duration: 1 })
					gsap.to('.frame-02', { opacity: 0, duration: 1 })
					gsap.to('.frame-03', { opacity: 0, duration: 1 })
					gsap.to('.frame-04', { opacity: 0, duration: 1 })
				},
			},
		})

		// frames 03

		const frames03 = gsap.timeline({
			scrollTrigger: {
				trigger: '.frames_point-03',
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				invalidateOnRefresh: false,
				onEnter: function () {
					// Когда триггер активируется при скролле вниз
					gsap.to('[data-frame="03"]', {
						x: '0%',
						y: '0%',
						opacity: 1,
						duration: 1,
					})
					gsap.to('.frame-01', { opacity: 0, duration: 1 })
					gsap.to('.frame-02', { opacity: 0, duration: 1 })
					gsap.to('.frame-03', { opacity: 1, duration: 1 })
					gsap.to('.frame-04', { opacity: 0, duration: 1 })
				},
				onLeave: function () {
					// Когда уходим из триггера (скроллим вниз)
					gsap.to('[data-frame="03"]', {
						x: '-100%',
						opacity: 0,
						duration: 1,
					})
					gsap.to('.frame-01', { opacity: 0, duration: 1 })
					gsap.to('.frame-02', { opacity: 0, duration: 1 })
					gsap.to('.frame-03', { opacity: 0, duration: 1 })
					gsap.to('.frame-04', { opacity: 1, duration: 1 })
				},
				onEnterBack: function () {
					// Когда возвращаемся к триггеру при скроллинге вверх
					gsap.to('[data-frame="03"]', {
						x: '0%',
						y: '0%',
						opacity: 1,
						duration: 1,
					})
					gsap.to('.frame-01', { opacity: 0, duration: 1 })
					gsap.to('.frame-02', { opacity: 0, duration: 1 })
					gsap.to('.frame-03', { opacity: 1, duration: 1 })
					gsap.to('.frame-04', { opacity: 0, duration: 1 })
				},
				onLeaveBack: function () {
					// Когда уходим с триггера при скроллинге вверх (элемент исчезает)
					gsap.to('[data-frame="03"]', {
						x: '100%',
						y: '100%',
						opacity: 1,
						duration: 1,
					})
					gsap.to('.frame-01', { opacity: 0, duration: 1 })
					gsap.to('.frame-02', { opacity: 1, duration: 1 })
					gsap.to('.frame-03', { opacity: 0, duration: 1 })
					gsap.to('.frame-04', { opacity: 0, duration: 1 })
				},
			},
		})

		// frames 04

		const frames04 = gsap.timeline({
			scrollTrigger: {
				trigger: '.frames_point-04',
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				invalidateOnRefresh: false,
				onEnter: function () {
					// Когда триггер активируется при скролле вниз
					gsap.to('[data-frame="04"]', {
						x: '0%',
						y: '0%',
						opacity: 1,
						duration: 1,
					})
					gsap.to('.frame-01', { opacity: 0, duration: 1 })
					gsap.to('.frame-02', { opacity: 0, duration: 1 })
					gsap.to('.frame-03', { opacity: 0, duration: 1 })
					gsap.to('.frame-04', { opacity: 1, duration: 1 })
				},
				onLeaveBack: function () {
					gsap.to('[data-frame="04"]', {
						x: '100%',
						y: '100%',
						opacity: 0,
						duration: 1,
					})
				},
			},
		})

		// showreel

		// Получаем видео элемент
		const video = document.querySelector('#bg-video')
		const showreel = gsap.timeline({
			scrollTrigger: {
				trigger: '.section_showreel', // Когда эта секция появится
				start: 'top center', // Когда секция в центре экрана
				end: 'bottom top', // Когда уходит за пределы видимости
				onEnter: () => video.play(), // Воспроизвести видео при входе
				onLeave: () => video.pause(), // Пауза видео, когда секция уходит
				onEnterBack: () => video.play(), // Воспроизвести видео при скролле назад
				onLeaveBack: () => video.pause(), // Пауза видео при выходе назад
			},
		})

		const swiper = new Swiper('.about_content', {
			slidesPerView: 'auto',
			spaceBetween: 8,
			modules: [Pagination],
			pagination: {
				el: '.about_pagination',
			},
		})

		// cta
		const ctaTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.cta_track',
				start: 'top center',
				end: 'bottom bottom',
				scrub: true,
			},
		})
		ctaTl.to(
			'[da="g-01"]',
			{
				y: '0%',
				duration: 2,
			},
			0
		)
		ctaTl.to(
			'[da="g-02"]',
			{
				y: '0%',
				duration: 2,
			},
			0
		)
		ctaTl.to(
			'[da="g-03"]',
			{
				y: '0%',
				duration: 2,
			},
			0
		)
	})

	// // Features flip card animation
	// const cards = document.querySelectorAll('.features_card');

	// let isReversing = false;         // Идет ли обратная анимация
	// let hoveredCard = null;         // Карточка, над которой сейчас курсор
	// let activeTimeline = null;      // Активный таймлайн
	
	// cards.forEach((card) => {
	//   const slideInner = card.querySelector('.slide_inner');
	
	//   card.addEventListener('mouseenter', () => {
	// 	hoveredCard = card;
	
	// 	// Если идет обратная анимация - ждем её завершения
	// 	if (isReversing) return;
	
	// 	// Если анимация уже активна для этой карточки - не запускаем повторно
	// 	if (activeTimeline && activeTimeline.card === card) return;
	
	// 	startFlipAnimation(card, slideInner);
	//   });
	
	//   card.addEventListener('mouseleave', () => {
	// 	if (!activeTimeline || activeTimeline.card !== card) return;
	
	// 	isReversing = true; // Блокируем новые анимации до завершения этой
	
	// 	activeTimeline.reverse().eventCallback('onReverseComplete', () => {
	// 	  isReversing = false; // Разрешаем новые анимации
	// 	  activeTimeline = null;
	
	// 	  // Если курсор над другой карточкой — запускаем её анимацию
	// 	  if (hoveredCard && hoveredCard !== card) {
	// 		const newSlideInner = hoveredCard.querySelector('.slide_inner');
	// 		startFlipAnimation(hoveredCard, newSlideInner);
	// 	  }
	// 	});
	//   });
	// });
	
	// function startFlipAnimation(card, slideInner) {
	//   if (activeTimeline) return; // Если есть активная анимация — ждем её завершения
	
	//   activeTimeline = gsap.timeline();
	//   activeTimeline.card = card; // Привязываем таймлайн к карточке
	
	//   activeTimeline.to(slideInner, {
	// 	duration: 0.8,
	// 	rotateY: -180,
	// 	ease: 'power2.out',
	//   });
	// }

	const cards = document.querySelectorAll('.features_card');

	let isReversing = false; // Идет ли обратная анимация
	let hoveredCard = null; // Карточка, над которой сейчас курсор
	let activeTimeline = null; // Активный таймлайн

	cards.forEach((card) => {
	const slideInner = card.querySelector('.slide_inner');
	const slideFront = card.querySelector('.slide_front');
	const slideBack = card.querySelector('.slide_back');

	card.addEventListener('mouseenter', () => {
		hoveredCard = card;

		if (isReversing) return;
		if (activeTimeline && activeTimeline.card === card) return;

		startFlipAnimation(card, slideInner, slideFront, slideBack);
	});

	card.addEventListener('mouseleave', () => {
		if (!activeTimeline || activeTimeline.card !== card) return;

		isReversing = true;

		activeTimeline.reverse().eventCallback('onReverseComplete', () => {
		isReversing = false;
		activeTimeline = null;

		if (hoveredCard && hoveredCard !== card) {
			const newSlideInner = hoveredCard.querySelector('.slide_inner');
			const newSlideFront = hoveredCard.querySelector('.slide_front');
			const newSlideBack = hoveredCard.querySelector('.slide_back');
			startFlipAnimation(hoveredCard, newSlideInner, newSlideFront, newSlideBack);
		}
		});
	});
	});

	function startFlipAnimation(card, slideInner, slideFront, slideBack) {
	if (activeTimeline) return;

	activeTimeline = gsap.timeline();
	activeTimeline.card = card;

	activeTimeline.to(slideInner, {
		duration: 0.8,
		rotateY: -180,
		ease: 'power2.out'
	}, 0)
	.to(slideFront, {
		duration: 0.8,
		opacity: 0,
		ease: 'power2.out'
	}, 0)
	.to(slideBack, {
		duration: 0.8,
		opacity: 1,
		ease: 'power2.out'
	}, 0);
	}






	
}

document.addEventListener('DOMContentLoaded', init)

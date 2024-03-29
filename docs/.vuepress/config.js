const path = require('path')
const rootpath = path.dirname(__dirname) //执行一次dirname将目录定位到docs目录
const utils = require('./utils/index.js')
const filehelper = require('./utils/initPage.js')

module.exports = {
	title: '二航的小破站', // 网站标题
	base:'/masterJ.github.io/',
	description: 'this is a font-end knowledge base', // 网站描述
	head: [
		['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
	],
	markdown: {
		lineNumbers: true, // 代码块显示行号
	},
	theme: 'reco',
	themeConfig: {
		search: true, //搜索
		searchMaxSuggestions: 10,
		subSidebar: 'auto',
		noFoundPageByTencent: false, // 关闭404
		// 导航栏
		nav: [
			{ text: '首页', link: '/' },
			{
				text: '前端技术',
				link: '/page/',
			},
			{
				text: '个人文章',
				items: [
					{
						text: '掘金',
						link: 'https://juejin.cn/user/2225067267465704',
					},
				],
			},
			{ text: '一些小建议', link: '/about/' },
		],
		// 侧边栏
		sidebar: {
			'/page/': [
				{
					title: 'HTML',
					children: [
						{
							title: '基础知识',
							path: 'html/lesson1'
						},
						{
							title: '常见问题',
							path: 'html/lesson2',
						},
					],
				},
				{
					title: 'CSS',
					children: [
						{
							title: '基础知识',
							path: 'css/lesson1',
						},
						{
							title: '常见问题',
							path: 'css/lesson2',
						},
						{
							title: '常用技巧(常见问题)',
							path: 'css/lesson3'
						}
					],
				},
				{
					title: 'JavaScript',
					children: [
						{
							title: '基础知识',
							path: 'JavaScript/lesson1',
						},
						{
							title: '常见问题',
							path: 'JavaScript/lesson2',
						},
					]
				},
				{
					title: 'Vue',
					children: [
						{
							title: '基础知识',
							path: 'Vue/lesson1',
						},
						{
							title: '常见问题',
							path: 'Vue/lesson2',
						},
						{
							title: 'vite的使用',
							path: 'Vue/vite'
						},
						{
							title: 'css开发规范',
							path: 'Vue/css'
						}
					]
				}
			]
		},
		sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
		lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
	},
}

<template>
	<el-container class="home-container">
		<!--头部区域-->
		<el-header>
			<div>
				<img src="../assets/home.png" />
				<span>医疗服务平台</span>
			</div>

			<el-button type="info" @click="logout">退出</el-button>
		</el-header>
		<!--主体部分-->
		<el-container>
			<!--侧边栏-->
			<el-aside :width="isCollapse ? '64px' : '200px'">
				<div class="toggle-button" @click="toggleCollapse">|||</div>
				<el-menu :collapse="isCollapse" background-color="#333744" text-color="#fff" active-text-color="#409EFF"
					:unique-opened="true" :collapse-transition="false" :router="true"
					:default-active="this.$route.path">
					<!--用户管理-->
					<el-submenu index="1">
						<template slot="title">
							<!--图标-->
							<i class="el-icon-user-solid"></i>
							<!--文本-->
							<span>用户管理</span>
						</template>
						<!--二级菜单-->
						<el-menu-item index="/users">
							<!--图标-->
							<i class="el-icon-menu"></i>
							<!--文本-->
							<span>患者信息</span>
						</el-menu-item>
						<el-menu-item index="12">
							<!--图标-->
							<i class="el-icon-menu"></i>
							<!--文本-->
							<span>医生信息</span>
						</el-menu-item>
					</el-submenu>

					<!--科室管理-->
					<el-submenu index="2">
						<template slot="title">
							<!--图标-->
							<i class="el-icon-s-check"></i>
							<!--文本-->
							<span>科室管理</span>
						</template>
						<!--二级菜单-->
						<el-menu-item index="21">
							<!--图标-->
							<i class="el-icon-menu"></i>
							<!--文本-->
							<span>科室信息</span>
						</el-menu-item>
					</el-submenu>

					<!--疾病管理-->
					<el-submenu index="3">
						<!--一级菜单的模板区域-->
						<template slot="title">
							<!--图标-->
							<i class="el-icon-s-release"></i>
							<!--文本-->
							<span>疾病管理</span>
						</template>
						<!--二级菜单-->
						<el-menu-item index="31">
							<!--图标-->
							<i class="el-icon-menu"></i>
							<!--文本-->
							<span>疾病信息</span>
						</el-menu-item>
					</el-submenu>

					<!--药品管理-->
					<el-submenu index="4">
						<!--一级菜单的模板区域-->
						<template slot="title">
							<!--图标-->
							<i class="el-icon-s-management"></i>
							<!--文本-->
							<span>药品管理</span>
						</template>
						<!--二级菜单-->
						<el-menu-item index="41">
							<!--图标-->
							<i class="el-icon-menu"></i>
							<!--文本-->
							<span>药品信息</span>
						</el-menu-item>
					</el-submenu>

					<!--就诊时段管理-->
					<el-submenu index="5">
						<!--一级菜单的模板区域-->
						<template slot="title">
							<!--图标-->
							<i class="el-icon-s-help"></i>
							<!--文本-->
							<span>就诊时段管理</span>
						</template>
						<!--二级菜单-->
						<el-menu-item index="51">
							<!--图标-->
							<i class="el-icon-menu"></i>
							<!--文本-->
							<span>就诊时段信息</span>
						</el-menu-item>
					</el-submenu>

					<!--财务管理-->
					<el-submenu index="6">
						<!--一级菜单的模板区域-->
						<template slot="title">
							<!--图标-->
							<i class="el-icon-s-finance"></i>
							<!--文本-->
							<span>财务管理</span>
						</template>
						<!--二级菜单-->
						<el-menu-item index="61">
							<!--图标-->
							<i class="el-icon-menu"></i>
							<!--文本-->
							<span>挂号记录</span>
						</el-menu-item>
						<el-menu-item index="62">
							<!--图标-->
							<i class="el-icon-menu"></i>
							<!--文本-->
							<span>药物支付记录</span>
						</el-menu-item>
					</el-submenu>
					<!--统计分析-->
					<el-submenu index="7">
						<!--一级菜单的模板区域-->
						<template slot="title">
							<!--图标-->
							<i class="el-icon-s-data"></i>
							<!--文本-->
							<span>统计分析</span>
						</template>
						<!--二级菜单-->
						<el-menu-item index="71">
							<!--图标-->
							<i class="el-icon-menu"></i>
							<!--文本-->
							<span>医生评价</span>
						</el-menu-item>

						<el-menu-item index="72">
							<!--图标-->
							<i class="el-icon-menu"></i>
							<!--文本-->
							<span>科室预约</span>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<!--右部主体区域-->
			<el-main>
				<!--路由占位符-->
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				//折叠
				isCollapse: false
			}
		},

		methods: {
			logout() {
				window.sessionStorage.removeItem("sss");
				this.$router.push('/login')
			},
			//菜单折叠
			toggleCollapse() {
				this.isCollapse = !this.isCollapse;
			}
		}

	};
</script>

<style lang="less" scoped>
	.el-header {
		background-color: #373D41;
		display: flex;
		justify-content: space-between;
		padding-left: 0;
		align-items: center;
		color: #FFFFFF;
		font-size: 20px;

		>div {
			display: flex;
			align-items: center;

			span {
				margin-left: 15px;
			}
		}
	}

	.el-aside {
		background-color: #333744;

		.el-menu {
			border-right-width: 0px;
		}
	}

	.el-main {
		background-color: #EAEDF1;
	}

	.home-container {
		height: 100%;
	}

	.toggle-button {
		width: 100%;
		background-color: #4A5064;
		font-size: 10px;
		line-height: 24px;
		color: #FFFFFF;
		text-align: center;
		letter-spacing: 0.2em;
		cursor: pointer;
	}
</style>

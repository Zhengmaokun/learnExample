<template>
	<div class="login_container">
		<div class="login_box">
			<el-form :model="loginForm" :rules="loginFormRelues" ref="loginFormRef" label-width="0px"
				class="login_form">
				<!--用户名-->
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
				</el-form-item>
				<!--密码-->
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
				</el-form-item>
				<!--单选按钮-->
				<el-form-item>
					<el-radio v-model="loginForm.radio" label="1">医生</el-radio>
					<el-radio v-model="loginForm.radio" label="2">患者</el-radio>
					<el-radio v-model="loginForm.radio" label="3">管理员</el-radio>
				</el-form-item>
				<!--按钮-->
				<el-form-item class="btn_s">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info" @click="resetLoginForm">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//登录表单绑定
				loginForm: {
					username: '',
					password: '',
					radio: '1',
				},
				loginFormRelues: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}, ],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}, ]
				}
			};
		},

		methods: {
			//重置表单
			resetLoginForm() {
				this.$refs.loginFormRef.resetFields();
			},
			//登录验证
			login() {
				this.$refs.loginFormRef.validate(valid => {
					if (!valid) {
						this.$message.warning('登录失败');
						
					} else {
						/*this.$axios
							.post('127.0.0.1',this.loginForm)
							.then(response => {
								
							})
							.catch(error => {
								console.log(error)
								this.errored = true
							})
							.finally(() => this.loading = false)*/
							this.$message.success('登录成功');
							window.sessionStorage.setItem('sss','sss');
							this.$router.push("/home")
							
					}
					
				});
			}
		}

	};
</script>

<style lang="less" scoped="scoped">
	.login_container {
		background-color: #2b4b6b;
		height: 100%;
	}

	.login_box {
		width: 450px;
		height: 300px;
		background-color: #FFFFFF;
		border-radius: 3px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.login_form {
		width: 100%;
		position: absolute;
		bottom: 0;
		padding: 0px 20px;
		box-sizing: border-box;
	}

	.btn_s {
		display: flex;
		justify-content: flex-end;
	}
</style>

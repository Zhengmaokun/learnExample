<template>
	<div>
		<!--面包屑导航-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>患者管理</el-breadcrumb-item>
		</el-breadcrumb>
		<!--卡片-->
		<el-card>
			<!--搜索与添加-->
			<el-row :gutter="20">
				<el-col :span="8">
					<el-input placeholder="请输入内容" v-model="searchName" clearable @clear="getUserList">
						<el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
				</el-col>
			</el-row>
			<!--用户列表-->
			<el-table :data="newUserList" border stripe>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="email" label="邮箱"></el-table-column>
				<el-table-column prop="phone" label="电话"></el-table-column>
				<el-table-column prop="address" label="地址"></el-table-column>
				<el-table-column label="状态">
					<template v-slot="scope">
						<el-switch v-model="scope.row.status"></el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="190px">
					<template v-slot="scope">
						<el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
							<el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.name)">
							</el-button>
						</el-tooltip>
						<el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
							<el-button type="danger" icon="el-icon-delete" @click="deleteUser(scope.row.name)">
							</el-button>
						</el-tooltip>
					</template>
				</el-table-column>

			</el-table>
			<!--分页-->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
				:page-sizes="[1, 2, 5, 10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</el-card>
		<!--添加用户对话框-->
		<el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%" @close="addDialogClose">
			<!--主体-->
			<el-form ref="addUserFormRef" :rules="addUserFormRules" :model="addUserForm" label-width="70px">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addUserForm.name"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addUserForm.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="出生年月">
					<el-date-picker type="date" placeholder="选择日期" v-model="addUserForm.birth"
						:picker-options="pickerOptions">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="addUserForm.email"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="addUserForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-cascader size="large" :options="options" v-model="addUserForm.address" @change="handleChange">
					</el-cascader>
				</el-form-item>
			</el-form>
			<!--底部-->
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addUser">确 定</el-button>
			</span>
		</el-dialog>
		<!--修改用户对话框-->
		<el-dialog title="修改用户" :visible.sync="editDialogVisible" width="30%" @close="editDialogClose">
			<el-form ref="editUserFormRef" :rules="editUserFormRules" :model="editUserForm" label-width="70px">
				<el-form-item label="姓名">
					<el-input v-model="editUserForm.name" disabled></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editUserForm.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="出生年月">
					<el-date-picker type="date" placeholder="选择日期" v-model="editUserForm.birth"
						:picker-options="pickerOptions">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="editUserForm.email"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="editUserForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-cascader size="large" :options="options" v-model="editUserForm.address" @change="handleChange">
					</el-cascader>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editUser">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	import {
		regionData
	} from 'element-china-area-data'
	import provinceAndCity from '../../assets/city/province.json'
	//验证邮箱
	var checkEmail = (rule, value, callback) => {
		const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
		if (regEmail.test(value)) {
			return callback();
		} else if (value != '') {
			callback(new Error('请输入合法的邮箱'));
		} else {
			callback(new Error('邮箱不能为空'))
		}

	}
	//验证手机号
	var checkPhone = (rule, value, callback) => {
		const regPhone = /^(1[3|5-9])\d{9}$/;
		if (regPhone.test(value)) {
			return callback();
		} else if (value != '') {
			callback(new Error('请输入合法的手机号'));
		} else {
			callback(new Error('手机号不能为空'));
		}

	}

	export default {
		data() {
			return {
				//搜索
				searchName: '',
				//分页
				pageNum: 1,
				pageSize: 1,
				total: 1,

				addUserForm: {
					name: '',
					sex: '男',
					birth: new Date(),
					email: '',
					phone: '',
					address: ["370000", "371700", "371721"]
				},

				userList: [{
						name: '张三',
						email: '4886318758@qq.com',
						phone: '13793015018',
						address: '山东省菏泽市曹县',
						status: true
					},
					{
						name: '李四',
						email: '15655256@qq.com',
						phone: '15275688854',
						address: '山东省菏泽市郓城县',
						status: false
					},
				],
				//添加用户数据
				newUserList: [],
				//修改用户数据
				editUserForm: {
					name: '',
					sex: '男',
					birth: new Date(),
					email: '',
					phone: '',
					address: ["370000", "371700", "371721"]
				},
				//添加用户对话框
				addDialogVisible: false,
				//修改用户对话框
				editDialogVisible: false,
				//地址类型
				options: regionData,
				//添加验证规则
				addUserFormRules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					email: [{
						validator: checkEmail,
						trigger: 'blur'
					}],
					phone: [{
						validator: checkPhone,
						trigger: 'blur'
					}]
				},
				//修改验证规则
				editUserFormRules: {
					email: [{
						validator: checkEmail,
						trigger: 'blur'
					}],
					phone: [{
						validator: checkPhone,
						trigger: 'blur'
					}]
				},
				//禁用日期设置
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
				},
				//地址
				search: {
					province: '',
					city: '',
					district: ''
				},
				//地址引用
				provinceAndCity,

			}
		},
		created() {
			this.getUserList()
		},
		methods: {
			//获取用户数据
			getUserList() {
				/*this.$axios.get('/getUserList',{
					params: {
						name: this.searchName
					}
				})
					.then()
					.catch()
					.finally();*/
				this.total = this.userList.length;
				this.changePage();
			},
			//page、pagesize改变时更新数据
			changePage() {
				this.newUserList.length = 0;
				let begin = (this.pageNum - 1) * this.pageSize;
				let end = this.pageNum * this.pageSize;
				for (var i = begin; i < end; i++) {
					if (i < this.total) {
						this.newUserList.push(this.userList[i]);
					}
				}
			},
			//监听pageSize改变
			handleSizeChange(newSize) {
				this.pageSize = newSize;
				console.log(this.queryInfo);
				this.changePage();
			},
			//监听page改变
			handleCurrentChange(newPage) {
				this.pageNum = newPage;
				this.changePage();
			},
			//添加用户对话框关闭时重置
			addDialogClose() {
				this.$refs.addUserFormRef.resetFields();
			},
			//修改用户对话框关闭时重置
			editDialogClose() {
				this.$refs.editUserFormRef.resetFields();
			},

			//添加用户
			addUser() {
				this.$refs.addUserFormRef.validate(valid => {
					if (valid) {
						/*this.$axios.put('/addUsr',this.addForm)
							.then()
							.catch()
							.finally();*/
						this.$message.success("添加用户成功");
						this.addDialogVisible = false;
						this.getUserList();
					} else {
						this.$message.warning("添加用户失败")
					}
				})
			},

			//修改用户
			editUser() {
				this.$refs.editUserFormRef.validate(valid => {
					if (valid) {
						/*this.$axios.put('/editUser',this.editUser)
							.then()
							.catch()
							.finally();*/
						this.$message.success("修改用户成功");
						this.getUserList();
						this.editDialogVisible = false;
					} else {
						this.$message.warning("修改用户失败")
					}
				})

			},
			//删除用户
			deleteUser(name) {
				this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					/*this.$axios.put('/deleteUser',{name:name})
						.then()
						.catch()
						.finally();*/
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//区域码转汉字
			handleChange(value) {
				this.search.province = ""
				this.search.city = ""
				this.search.district = ""
				for (var k = 0, lengthk = provinceAndCity.length; k < lengthk; k++) {
					//确定省
					if (provinceAndCity[k].code == value[0]) {
						this.search.province = provinceAndCity[k].name;
						if (provinceAndCity[k].cityList && value.length >= 2 && value[1] != "") {
							for (var i = 0, lengthi = provinceAndCity[k].cityList.length; i < lengthi; i++) {
								//确定市
								if (provinceAndCity[k].cityList[i].code == value[1] || provinceAndCity[k].cityList
									.length == 1) {
									this.search.city = provinceAndCity[k].cityList[i].name;
									//确定区
									if (provinceAndCity[k].cityList[i].areaList && value.length == 3 && value[2] != "") {
										for (var j = 0, lengthj = provinceAndCity[k].cityList[i].areaList.length; j <
											lengthj; j++) {
											if (provinceAndCity[k].cityList[i].areaList[j].code == value[2]) {
												this.search.district = provinceAndCity[k].cityList[i].areaList[j].name;
												break;
											}
										}
									}
									break;
								}
							}
						}
						break;
					}
				}
				console.log(value)
				console.log(this.search.province + "," + this.search.city + "," + this.search.district)
			},

			//修改对话框打开
			showEditDialog(row) {
				console.log(row);
				/*this.$axios.get('/getUserList',{
					params: {
						name: this.searchName
					}
				})
					.then()
					.catch()
					.finally();
					*/
				//this.editUserForm = row;
				this.editDialogVisible = true;
			},

			//
		}
	}
</script>

<style lang="less" scoped>
</style>
